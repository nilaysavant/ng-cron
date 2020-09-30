import { ElementRef, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// @ts-ignore
import Prism from 'prismjs';
import * as _ from 'lodash-es';

// internal
import { OptionsInterface } from './prism.interface';

@Injectable()
export class PrismService {
	constructor(private sanitizer: DomSanitizer) { }

	public highlight(el: ElementRef, options: OptionsInterface): void {
		// Always need to have el.
		if (el instanceof ElementRef) {
			if (options.code) {
				el.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(options.code));
			}
			// Perform interpolate.
			if (options.interpolation) {
				el.nativeElement.innerHTML = this.interpolate(el.nativeElement.innerHTML, options.interpolation);
			}
			// Perform prism highlight code.
			Prism.highlightElement(el.nativeElement, options.async, options.callback);
		}
	}

	hooks() {
		return Prism.hooks;
	}

	private escapeHtml(unsafe: string) {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	private interpolate(string: string, interpolation: Object): string {
		if (interpolation && typeof interpolation === 'object') {
			_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

			return _.template(string)(interpolation);
		}
		return string;
	}
}