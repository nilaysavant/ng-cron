import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, Scroll } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DeviceService } from './../../shared/device.service';

@Component({
  templateUrl: './doc.html',
  styleUrls: ['./doc.scss']
})
export class DocComponent implements OnInit, OnDestroy {
	@ViewChild('view', { static: true }) view: ElementRef|null = null;
	private sub: Subscription|null = null;

	showSidebar: boolean|null = null;

	constructor(
		private readonly deviceService: DeviceService,
		private readonly router: Router,
		private readonly viewportScroller: ViewportScroller
	) {
		if (this.deviceService.isTablet()) {
			this.showSidebar = false;
		}
	}

	ngOnInit() {
		this.viewportScroller.setOffset([0, 50]);
		this.sub = this.router.events
			.pipe(filter(e => e instanceof Scroll))
			.subscribe((e: Scroll) => {
				if (e.anchor) {
					const elmnt = document.getElementById(e.anchor);
					elmnt.scrollIntoView({
						block: 'start',
						behavior: 'smooth'
					});
				} else if (e.position) {
				
					// backward navigation
					this.viewportScroller.scrollToPosition(e.position);
				} else {
					// forward navigation
					this.viewportScroller.scrollToPosition([0, 0]);
				}
			});
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
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
