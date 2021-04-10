export const disabledHtmlExample = 
`<quartz-cron
	[disabled]="disabled"
	[(ngModel)]="cronValue">
</quartz-cron>`;

export const ngModelHtmlExample = `<quartz-cron [(ngModel)]="cronValue"></quartz-cron>`;

export const nonFormUsingHtmlExample = 
`Cron Value: {{nonFormValue}}
<quartz-cron (changed)="nonFormValue = $event"></quartz-cron>`;

export const nonFormUsingTsExample = 
`@ViewChild(QuartzCronComponent, {static: true}) cron: QuartzCronComponent;

nonFormValue = '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1';

ngOnInit() {
	this.cron.writeValue(this.nonFormValue);
}`;

export const activeTabTsExample = 
`import { Tab } from '@sbzen/ng-cron';

export class MyComponent {
	activeTab = Tab.SECONDS;
}`;

export const activeTabHtmlExample = 
`<quartz-cron
	[activeTab]="activeTab"
	(tabChanged)="activeTab = $event">
</quartz-cron>`;