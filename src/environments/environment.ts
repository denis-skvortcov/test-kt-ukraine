// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCjBa6vki9Uq2k8qCj4Pw4I7IqVQ-7amGs',
    authDomain: 'kt-ukraine.firebaseapp.com',
    databaseURL: 'https://kt-ukraine.firebaseio.com',
    projectId: 'kt-ukraine',
    storageBucket: 'kt-ukraine.appspot.com',
    messagingSenderId: '345092870308'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
