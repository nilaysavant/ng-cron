import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UnixCronModule, QuartzCronModule } from '@sbzen/ng-cron';

import { ContainerModule } from './container/container.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ContainerModule,
		UnixCronModule,
		QuartzCronModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
