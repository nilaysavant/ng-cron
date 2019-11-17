import { Component, ViewChild, OnInit } from '@angular/core';

import { QuartzCronComponent } from '@sbzen/ng-cron';

@Component({
	templateUrl: './usage-demo.html',
	styleUrls: ['./usage-demo.scss']
})
export class DocUsageDemoComponent implements OnInit {
	@ViewChild('cron', {
		static: true,
		read: QuartzCronComponent
	}) cron: QuartzCronComponent;

	ngModelExpression = '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1';
	ngModel = `<quartz-cron [(ngModel)]="cronValue"></quartz-cron>`;
	ngModelExpressionDisabled = `<quartz-cron [(ngModel)]="cronValue" [disabled]="disabled"></quartz-cron>`;
	ngModelExpressionRequired = `<quartz-cron [(ngModel)]="cronValue" required></quartz-cron>`;
	ngModelExpressionRequiredValue = '';
	disabled = true;

	nonFormUsingValue = '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1';
	nonFormUsingHtml = 
`Cron Value: {{nonFormValue}}
<quartz-cron (changed)="nonFormValue = $event"></quartz-cron>`;

	nonFormUsingTs = 
`@ViewChild(QuartzCronComponent, {static: true}) cron: QuartzCronComponent;

ngOnInit() {
	this.cron.writeValue('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');
}`;

	ngOnInit() {
		this.cron.writeValue('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');
	}
}
