import { Component, provide, enableProdMode } from "@angular/core";
import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { appRouterProviders } from './app.routes';
import { AppComponent } from './components/app/app.component';


// enableProdMode();
bootstrap(AppComponent, [
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  appRouterProviders,
  provideForms(),
  disableDeprecatedForms()
]);