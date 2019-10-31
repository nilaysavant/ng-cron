import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  expression = '0,3,15,27 0 0 ? JAN,FEB,AUG,SEP * *';
  // expression = '0,3,15,27 0 0 ? 9/9 * *';
}
