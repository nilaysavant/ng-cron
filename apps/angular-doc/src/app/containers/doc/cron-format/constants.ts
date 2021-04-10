export const quartzHtmlExample = `<quartz-cron [(ngModel)]="quartzCronValue"></quartz-cron>`;
export const quartzComponentExample = 
`export class MyComponent {
	quartzCronValue = '2,0,4,3,1 0/1 3/2 ? * WED *';
}`;
export const quartzModuleExample = 
`import { QuartzCronModule } from '@sbzen/ng-cron';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		QuartzCronModule
	]
})`;

export const unixHtmlExample = `<unix-cron [(ngModel)]="unixCronValue"></unix-cron>`;
export const unixComponentExample = 
`export class MyComponent {
	unixCronValue = '5 0 * 8 *';
}`;
export const unixModuleExample = 
`import { UnixCronModule } from '@sbzen/ng-cron';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UnixCronModule
	]
})`;