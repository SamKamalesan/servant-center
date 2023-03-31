import awsAmplifyConfig from "src/aws-exports";

export const environment = {
  production: true,
  oauth: {
    domain: awsAmplifyConfig.oauth.domain,
    scope: ['email', 'openid'],
    redirectSignIn: awsAmplifyConfig.oauth.redirectSignIn,
    redirectSignOut: awsAmplifyConfig.oauth.redirectSignOut,
    responseType: awsAmplifyConfig.oauth.responseType,
    redirect_uri: awsAmplifyConfig.oauth.redirectSignIn
  },
  serviceUrl: {
    consentGetUser: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/consentForm/getUserDetails/',
    consentUpdateUser: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/consentForm/acceptConsent/',
    veteranProfileGetUser:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/userProfile/getUserDetails/',
    caseWorkerUser:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/uiLayout/getCaseWorkerDetails/', 
    getVeteranId:'https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getVeteranId/',
    veteranProfileUpdateUser:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/userProfile/updateUserDetails/',
    getHealthTracker:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/healthTracker/getHealthTracker/',
    updateHealthTracker:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/healthTracker/updateHealthTracker/',
    saveTransportationForm:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/transportationForm/saveTransportationRequest/',
    getTransportRequestFormData:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/transportationForm/getTransportationRequests/',
    approveTransportationForm:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/transportationForm/approveTransportationRequests/',
    getCaseWorkerEvents:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getCalendarEvents/',
    addCaseWorkerEvents:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/postCalendarEvents',
    getCurrentVeteranEvents:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getCurrentVeteranEvents/',
    addUser:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/addUser/',
    addVeteran:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/addVeteran/',
    addCaseWorker:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/addCaseWorker/',
    getAssessmentData: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/assessmentDetails/',
    getProgressNotes: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getGoals/',
    createProgressNotes: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/progressNotes/addGoal/',
    updateProgressNotes: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/progressNotes/updateGoalStatus/',
    getTreatmentPlan: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getTreatmentPlanDetails/',
    getTreatmentPlanRS:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/residentSearch/getTreatmentPlanDetails/',
    saveTreatmentPlan: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/postTreatmentPlanDetails/save/',
    updateTreatmentPlan: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/updateTreatmentPlanDetails/save/',
    getResidentSearchData: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/residentSearch/getAll',
    getIAPage1Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1/',
    postIAPage1Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1/',
    getIAPage2Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-2/',
    postIAPage2Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-2/',
    getIAPage3Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-3/',
    postIAPag34Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-3/',
    getIAPage4Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-4/',
    postIAPage4Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-4',
    updateProfileImage: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/uploadImage/',
    getProfileImage: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/profileImage/',
    getInitialTreatmentPage: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-5/',
    getFamilyMembersDetails: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1FD/',
    postFamilyMembersDetails: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1FD/',
    updateFamilyMembersDetails: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1FD/',
    deleteFamilyMembersDetails: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-1FD/',
    getCwNicknameDetails:' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getCaseWorkerNickname',
    getCwUserNameDetails: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getWebpartyUsername',
    postIAPage5Details: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/initialAssessment/page-5/',
    addNewVeteranRS: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/addNewVeteran/',
    getConsent: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/uiLayout/getUserDetails/',
    uploadMiscFile: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/fileUpload/',
    getMiscFile: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/getUploadedFiles',
    downloadMiscFile: ' https://vu8x499o3l.execute-api.us-east-1.amazonaws.com/test_v1/downloadFile'
  },
  localUrl:''
};
