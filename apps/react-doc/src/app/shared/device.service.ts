export class DeviceService {
	constructor(private document: Document = window.document) {}

	isTablet() {
		return this.document.body.clientWidth <= 768;
	}

	isMobile() {
		return this.document.body.clientWidth <= 576;
	}
}
