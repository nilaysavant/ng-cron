export const tabsManagingHtmlExample = `<quartz-cron [tabs]="tabs"></quartz-cron>`;

export const tabsManagingTsExample = 
`import { Tab } from '@sbzen/ng-cron';

export class MyComponent {
	tabs = [Tab.SECONDS, Tab.HOURS];
}`;

export const hideTabsHtmlExample = `<quartz-cron [hideTabs]="hideTabs"></quartz-cron>`;

export const hideTabsTsExample = 
`export class MyComponent {
	hideTabs = false;
}`;