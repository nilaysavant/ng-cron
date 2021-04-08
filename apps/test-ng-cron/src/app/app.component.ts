import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Tab } from '@sbzen/ng-cron';

@Component({
	selector: 'sbzen-root',
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	tab = Tab;

	constructor(private readonly cd: ChangeDetectorRef) {}

	tick() {
		this.cd.detectChanges();
	}
}
