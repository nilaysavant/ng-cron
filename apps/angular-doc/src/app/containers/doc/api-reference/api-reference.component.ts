import { Component } from '@angular/core';

import { tabExample, cronLocalizationExample } from './constants';

@Component({
	templateUrl: './api-reference.html'
})
export class DocApiReferenceComponent {
	tabExample = tabExample;
	cronLocalizationExample = cronLocalizationExample;
}
