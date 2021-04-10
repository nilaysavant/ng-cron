import { Component } from '@angular/core';

import {
	localizationHtmlExample,
	localizationTsExample,
	secondsTabLocalization,
	fullLocalization
} from './constants';

@Component({
	templateUrl: './localization.html'
})
export class DocLocalizationComponent {
	localizationHtmlExample = localizationHtmlExample;
	localizationTsExample = localizationTsExample;
	secondsTabLocalization = secondsTabLocalization;
	fullLocalization = fullLocalization;
}
