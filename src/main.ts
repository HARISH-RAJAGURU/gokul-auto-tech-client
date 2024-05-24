import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { NgModule } from '@angular/core';
import {
  getAllDataFromLocalForage,
  default as localForage,
} from 'ngrx-store-persist';

getAllDataFromLocalForage({
  driver: localForage.INDEXEDDB,
  keys: ['userDetails', 'newEmployee','newProfile'],
}).then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
});
