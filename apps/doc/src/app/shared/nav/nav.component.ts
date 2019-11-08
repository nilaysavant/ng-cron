import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class NavComponent {
  expression = '0,3,15,27 0 0 ? JAN,FEB,AUG,SEP * *';
  // expression = '0,3,15,27 0 0 ? 9/9 * *';
}
