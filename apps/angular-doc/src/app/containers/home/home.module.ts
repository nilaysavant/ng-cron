import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '@ngx-prism/core';
import { QuartzCronModule } from '@sbzen/ng-cron';

import { HeaderModule } from './../../shared/header/header.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,

		PrismModule,
		QuartzCronModule,
		HeaderModule
	],
	declarations: [
		HomeComponent
	],
	exports: [
		HomeComponent
	]
})
export class HomeModule {}
