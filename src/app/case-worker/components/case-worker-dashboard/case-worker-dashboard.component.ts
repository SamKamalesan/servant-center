import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalendarOptions } from '@fullcalendar/angular';
import { MessageService } from 'primeng/api';
import { CalendarResp } from 'src/app/shared/models/calendarEventsResponse';
import { ClipBoardService } from 'src/app/shared/services/clip-board.service';
import { CalendarEventsService } from '../../services/calendar-events.service';

@Component({
  selector: 'app-case-worker-dashboard',
  templateUrl: './case-worker-dashboard.component.html',
  styleUrls: ['./case-worker-dashboard.component.scss'],
  providers: [MessageService],
})
export class CaseWorkerDashboardComponent implements OnInit {
  public items: any;
  public display = false;
  public eventList: any = [];
  public totalEvents: any = [];
  public tagName = 'Appointment';
  public eventsForm!: FormGroup;
  public displayEvent = false;
  public eventInfo: any = [];
  public minDateValue: any;
  public count = 0;
  public participantsExceeded: boolean = false;
  public partic: string = '';
  public isAppointment: boolean = true;
  public caseWorkerId: any;
  public CurrentYear: any;
  public isShowSpinner: boolean = true;
  public wrongDate: boolean = false;
  minimumDate: any;
  public displayAppointment:boolean = false;
  public displayEventDialog:boolean = false;
  public showAppointmentDialog:boolean=true;
  public showEventDialog:boolean=false;
  constructor(
    private service: CalendarEventsService,
    private formBuilder: FormBuilder,
    private cache: ClipBoardService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('case worker dashboard component');
    this.minimumDate = new Date();
    document.getElementById("overlay")!.style.display="block"
    this.minDateValue = new Date(new Date().getTime());
    this.items = [
      { label: 'Appointment', icon: 'pi pi-fw pi-calendar' },
      { label: 'Event', icon: 'pi pi-fw pi-pencil' },
    ];
    this.caseWorkerId = this.cache.get('caseworkerId');
    console.log('this.caseWorkerId', this.caseWorkerId);

    this.service
      .getCalendarEvents(this.caseWorkerId)
      .subscribe((data: CalendarResp) => {
        this.totalEvents = data;
        if(this.totalEvents){
          this.isShowSpinner=false;
          document.getElementById("overlay")!.style.display="none"
        }
        console.log(this.totalEvents);
        this.getCaseWorkerEventData(data);
      });

    this.builtForm();
  }

  getCaseWorkerEventData(data: any) {
    this.totalEvents = data;
    for (let i = 0; i < this.totalEvents.data.length; i++) {
      let eventDate = this.totalEvents.data[i].eventstart.substring(0, 10);
      this.totalEvents.data[i]['date'] = eventDate;
    }
    console.log('this.totalEvents.data',this.totalEvents.data);
    
    this.calendarOptions.events = this.totalEvents.data;
  }

  changeTimeZone(dateTime: any): string {
    var eventDate = new Date(dateTime);
    var timeZoneDifference = (eventDate.getTimezoneOffset() / 60) * -1; //convert to positive value.
    eventDate.setTime(eventDate.getTime() + timeZoneDifference * 60 * 60 * 1000);
    console.log('eventDate.toISOString()', eventDate.toISOString());
    var eventTime = eventDate.toISOString().substring(11, 16);
    return eventDate.toISOString();
  }
  public builtForm() {
    this.eventsForm = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      participants: new FormArray([]),
    });
  }

  getParticipantsDetailFormGroup() {
    return this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  focusFunction(){
    this.wrongDate=false;
  }
  checkDate(Startdate:any,endTime:any){    
    if(new Date(endTime.inputFieldValue) < new Date(Startdate.inputFieldValue)){
      this.wrongDate=true;
    }else{
      this.wrongDate=false;
    }
  }

  addParticipant() {
    this.count = this.count + 1;
    if (this.count <= 20) {
      const participantsFormArray = this.participants;
      participantsFormArray.push(this.getParticipantsDetailFormGroup());
    } else {
      this.participantsExceeded = true;
    }
  }

  removeParticipant(index: number) {
    this.count -= 1;
    const participantsFormArray = this.participants;
    participantsFormArray.removeAt(index);
    //if(this.count <= 20){
    this.participantsExceeded = false;
    //}
  }

  get participants() {
    return this.eventsForm.get(['participants']) as FormArray;
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    validRange: {
      start: new Date().getFullYear() + '-01-01',
      end: new Date().getFullYear() + '-12-31',
    },
    eventClick: this.showEventDetail.bind(this),
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,listWeek',
    },
    nowIndicator: true,
    //events: './assets/mock/calendarEvents.json',
  };
  addEvent() {
    if(this.showAppointmentDialog){
      this.displayAppointment = true;
      this.displayEventDialog =false
    }else if(this.showEventDialog){
      this.displayEventDialog =true;
      this.displayAppointment =false;
    }
  }
  get getControl() {
    return this.eventsForm.controls;
  }
  onSubmit() {
    let eventParticipants = '';
    console.log(this.eventsForm.value);
    let event = this.eventsForm.value;
    for (let i = 0; i < event.participants.length; i++) {
      eventParticipants += event.participants[i].name + ',';
    }

    let newEvent = {
      case_worker_id: this.caseWorkerId,
      isAppointment: this.isAppointment,
      title: event.eventTitle,
      description: event.eventDescription,
      sTime: this.changeTimeZone(event.startTime),
      enTime: this.changeTimeZone(event.endTime),
      participants: eventParticipants,
    };

    //sending calendar events/appointments to backend database
    this.service.postCalendarEvents(newEvent).subscribe((response) => {
      if(response){
        this.isShowSpinner=true;
        document.getElementById("overlay")!.style.display="block"
      }
      this.service
        .getCalendarEvents(this.caseWorkerId)
        .subscribe((data: CalendarResp) => {
          if(data){
            this.isShowSpinner=false;
            document.getElementById("overlay")!.style.display="none"
          }
          this.totalEvents = data;
          console.log(this.totalEvents);
          this.getCaseWorkerEventData(data);
        });
      if (response.responseStatus === 'SUCCESS') {
        console.log('successfully posted event to backend');
        this.sucessMessage();
      } else if (response.responseStatus === 'FAILUER') {
        this.failuerMessage();
      }
    });
    this.eventsForm.reset();
    let participantsArray = this.eventsForm.get(['participants']) as FormArray;
    this.clearFormArray(participantsArray);
    if(this.showAppointmentDialog){
      this.displayAppointment = false;
    }else if(this.showEventDialog){
      this.displayEventDialog =false
    }
  }
  onCancel() {
    this.count = 0;
    this.eventsForm.reset();
    let participantsArray = this.eventsForm.get(['participants']) as FormArray;
    this.clearFormArray(participantsArray);
    this.display = false;
  }
  changeTag(value: any) {
    this.tagName = value.activeItem.label;
    if (this.tagName === 'Appointment') {
      this.isAppointment = true;
      this.showEventDialog = false;
      this.showAppointmentDialog = true;
    } else if (this.tagName === 'Event') {
      this.isAppointment = false;
      this.showEventDialog = true;
      this.showAppointmentDialog = false;
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  crossButton() {
    this.count = 0;
    this.eventsForm.reset();
    let participantsArray = this.eventsForm.get(['participants']) as FormArray;
    this.clearFormArray(participantsArray);
  }
  showEventDetail(arg: any) {
    this.displayEvent = true;
    console.log('arg', arg);
    if (arg.event._def.extendedProps.isappointment) {
      this.tagName = 'Appointment';
    } else {
      this.tagName = 'Event';
    }
    this.eventInfo = [
      this.tagName,
      arg.event._def.extendedProps.eventstart,
      arg.event._def.extendedProps.eventend,
      arg.event._def.title,
      arg.event.start,
      arg.event._def.extendedProps.description,
    ];
  }

  sucessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.tagName + ' saved successfully !!',
    });
  }

  failuerMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong !!',
    });
  }
}
