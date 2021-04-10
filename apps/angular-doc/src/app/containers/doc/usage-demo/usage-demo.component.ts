import { Component, ViewChild, OnInit } from '@angular/core';

import { QuartzCronComponent, Tab } from '@sbzen/ng-cron';

import {
	disabledHtmlExample,
	activeTabHtmlExample,
	activeTabTsExample,
	ngModelHtmlExample,
	nonFormUsingHtmlExample,
	nonFormUsingTsExample
} from './constants';

@Component({
	templateUrl: './usage-demo.html',
	styleUrls: ['./usage-demo.scss']
})
export class DocUsageDemoComponent implements OnInit {
	@ViewChild('cron', {
		static: true,
		read: QuartzCronComponent
	}) cron: QuartzCronComponent;

	disabledHtmlExample = disabledHtmlExample;
	ngModelHtmlExample = ngModelHtmlExample;
	nonFormUsingHtmlExample = nonFormUsingHtmlExample;
	nonFormUsingTsExample = nonFormUsingTsExample;
	activeTabHtmlExample = activeTabHtmlExample;
	activeTabTsExample = activeTabTsExample;

	ngModelExpression = '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1';
	nonFormUsingValue = '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1';
	disabled = true;
	tabs = [Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR];
	activeTab = Tab.SECONDS;

	ngOnInit() {
		this.cron.writeValue('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');
	}
}
