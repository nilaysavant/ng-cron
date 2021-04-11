import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Type, UnixService, CronUnixUIService } from '@sbzen/cron-core';

import { CronHostComponent } from './../cron-host.abstract';

export function unixCronServiceFactory() {
	return new CronUnixUIService(new UnixService())
};

@Component({
	selector: 'unix-cron',
	templateUrl: './unix.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: CronUnixUIService,
			useFactory: unixCronServiceFactory
		},
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UnixCronComponent),
			multi: true
		}
	]
})
export class UnixCronComponent extends CronHostComponent {
	constructor(cronUnixUI: CronUnixUIService) {
		super(cronUnixUI, [Type.MINUTES, Type.HOURS, Type.DAY, Type.MONTH]);
	}
}
