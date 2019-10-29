import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiCronModule } from 'ui';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    UiCronModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
