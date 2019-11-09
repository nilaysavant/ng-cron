import { Component } from '@angular/core';

@Component({
	templateUrl: './get-started.html',
	styleUrls: ['./get-started.scss']
})
export class DocGetStartedComponent {
	ngModule = 
`import { QuartzCronModule } from '@sbzen/ng-cron';

@NgModule ({
	imports: [
		QuartzCronModule
	]
})`;

	template = '<quartz-cron></quartz-cron>';
}
