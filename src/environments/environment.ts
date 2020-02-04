// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDOpxE4Xa7jjWMTtmxXbiAtP_BgyKbosdU",
    authDomain: "prattika-8e350.firebaseapp.com",
    databaseURL: "https://prattika-8e350.firebaseio.com",
    projectId: "prattika-8e350",
    storageBucket: "prattika-8e350.appspot.com",
    messagingSenderId: "680864243538",
    appId: "1:680864243538:web:3246e74b1d65f5bd6a648b",
    measurementId: "G-05YKHP7QYZ"
  }
};

export const SERVER_URL="http://prattika.com.br:21019"
//export const SERVER_URL="http://127.0.0.1:3333"

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 import 'zone.js/dist/zone-error';  // Included with Angular CLI.
