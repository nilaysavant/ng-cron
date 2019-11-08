import { Component } from '@angular/core';

import { DeviceService } from './../../shared/device.service';

@Component({
  templateUrl: './doc.html',
  styleUrls: ['./doc.scss']
})
export class DocComponent {
	showSidebar: boolean|null = null;

	constructor(private deviceService: DeviceService) {
		if (this.deviceService.isTablet()) {
			this.showSidebar = false;
		}
	}

	toggleSideBar() {
		const isTablet = this.deviceService.isTablet();
		if (!isTablet) {
			const close = this.showSidebar || this.showSidebar === null;
			this.showSidebar = close ? false : null;
			return;
		}
		this.showSidebar = !this.showSidebar;
	}
}
