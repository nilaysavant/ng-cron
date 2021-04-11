import { Component } from '@angular/core';

import {
	quartzHtmlExample,
	quartzComponentExample,
	quartzModuleExample,
	unixComponentExample,
	unixHtmlExample,
	unixModuleExample
} from './constants';

@Component({
	templateUrl: './cron-format.html',
	styleUrls: ['./cron-format.scss']
})
export class DocCronFormatComponent {
	quartzHtmlExample = quartzHtmlExample;
	quartzComponentExample = quartzComponentExample;
	quartzModuleExample = quartzModuleExample;
	quartzCronValue = '2,0,4,3,1 0/1 3/2 ? * WED *';

	unixComponentExample = unixComponentExample;
	unixHtmlExample = unixHtmlExample;
	unixModuleExample = unixModuleExample;
	unixCronValue = '5 0 * JAN *';
}
