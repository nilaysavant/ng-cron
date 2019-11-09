import { Component } from '@angular/core';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
	cronValue = '2,0,4,3,1 0/1 3/2 ? * 4/5 *';
	features = [
		{
			icon: 'fab fa-angellist',
			title: 'Native',
			desc: `
				As simple as Angular. Nothing else.
				The Bootstrap CSS is a optional dependency.
			`
		},
		{
			icon: 'fas fa-brush',
			title: 'Customization',
			desc: `You can customize the component as you want.`
		},
		{
			icon: 'fab fa-npm',
			title: 'Open-source and on npm',
			desc: `Use it directly in your project using npm.`
		}
	];

	template = 
`<input
	class="form-control"
	readonly
	name="cron"
	[(ngModel)]="cronValue">

<quartz-cron [(ngModel)]="cronValue"></quartz-cron>`;

	component = 
`export class MyComponent {
	cronValue = '2,0,4,3,1 0/1 3/2 ? * 4/5 *';
}`;

	module = 
`import { QuartzCronModule } from '@sbzen/ng-cron';
@NgModule({
	imports: [
		QuartzCronModule
	]
})`;
}
