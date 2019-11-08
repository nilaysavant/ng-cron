import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class DeviceService {
	constructor(@Inject(DOCUMENT) private document: Document) {}

	isTablet() {
		return this.document.body.clientWidth <= 768;
	}

	isMobile() {
		return this.document.body.clientWidth <= 576;
	}
}
