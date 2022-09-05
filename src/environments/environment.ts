// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import awsConfig from "src/aws-exports";

const winHostNm = window.location.hostname;
let envConfig: any;

if (winHostNm === 'localhost' || winHostNm.includes('dev') || winHostNm.includes('dd1w1wuqwe28t')) {
  envConfig = awsConfig.oauth.dev;
} else {
  envConfig = awsConfig.oauth.prod;
}

export const environment = {
  production: false,
  cognitoUserPoolId: 'us-east-1_SpellypxJ',
  cognitoAppClientId: '3ebsuhsnrt5j4n2hsko4n0m88r',
  oldCognitoUserPoolId: 'us-east-1_8wIG1UbUU',
  oldCognitoAppClientId: '5igt34gtp2ok5mf02d9e4v30lb',

  loginURL:
    'https://servant-center.auth.us-east-1.amazoncognito.com/login?' +
    'client_id=5igt34gtp2ok5mf02d9e4v30lb&response_type=code&' +
    'redirect_uri=http://localhost:4200/veteran',

  redirectURL: 'http://localhost:4200/veteran',

  cognitoTokenURL:
    'https://servant-center.auth.us-east-1.amazoncognito.com/oauth2/token',
  oauth: {
    domain: envConfig.domain,
    scope: ['email', 'openid'],
    redirectSignIn: envConfig.redirectSignIn,
    redirectSignOut: envConfig.redirectSignOut,
    responseType: 'code',
    redirect_uri: envConfig.redirectSignIn
  },
  serviceUrl: {
    consentGetUser: '',
    consentUpdateUser: ''
  },
  localUrl:'http://localhost:3000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
