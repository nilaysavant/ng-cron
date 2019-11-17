import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
	@Output() barChanged = new EventEmitter<never>();
	@Input() hideBar = false;

	changeBar() {
		this.barChanged.emit();
	}
}
