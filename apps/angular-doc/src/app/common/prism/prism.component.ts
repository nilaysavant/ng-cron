import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation
} from '@angular/core';

import { PrismHoodClass } from './prism.class';
import { PrismService } from './prism.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [PrismService],
	selector: 'app-ngx-prism',
	templateUrl: './prism.html'
})

export class PrismComponent extends PrismHoodClass implements AfterContentInit, AfterViewInit {
	constructor(
		public changeDetectorRef: ChangeDetectorRef,
		public prismService: PrismService
	) {
		super(changeDetectorRef, prismService);
	}

	ngAfterContentInit() {
		if (this.cd) {
			this.__properties = this.cd;
		}
	}

	ngAfterViewInit() {
		this.ready = true;
		this.highlightElement({
			code: this.code,
			language: this.language
		});
	}
}