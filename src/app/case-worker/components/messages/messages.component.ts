import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public requestObject: any;
  selectedResident: any;
  tableValues: any;
  public isShowSpinner:boolean=false;
  public greyingOut: boolean= false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: TransportService
  ) {
    this.service.getTransportRequestFormData().subscribe((data) => {
      this.tableValues = data;
      this.isShowSpinner=false;
      this.greyingOut = false;

      //document.getElementById("overlay")!.style.display="none"
      console.log(this.tableValues);
      console.log(' i am table values');
    });
  }

  columns = [
    { field: 'first_name', header: 'firstName' },
    { field: 'last_name', header: 'lastName' },
    { field: 'pick_up_address_main', header: 'address' },
  ];

  ngOnInit(): void {
    this.isShowSpinner=true;
    this.greyingOut = true;

    //document.getElementById("overlay")!.style.display="block";
    console.log('messages component');
  }

  selectResident(index: number) {
    this.selectedResident = this.tableValues[index];
    console.log("Data",this.selectedResident);
  }
}
