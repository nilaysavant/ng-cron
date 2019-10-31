import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CronBootstrapModule } from '@sbzen/cron-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    CronBootstrapModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
