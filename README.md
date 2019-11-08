# Quartz Cron Component - Angular

[Angular](https://angular.io/) cron widget built from the ground up using only [Bootstrap 4](https://getbootstrap.com/) CSS.

Please check our [demo & documentation](https://ng-bootstrap.github.io) and the list of
[issues](https://github.com/ng-bootstrap/ng-bootstrap/issues) to see all the things we are working on. Feel free to make comments there.

<p align="center">
	<a href="https://badge.fury.io/js/ngx-bootstrap">
		<img
			src="https://badge.fury.io/js/ngx-bootstrap.svg"
			alt="npm version">
	</a>
	<a href="https://npmjs.org/ngx-bootstrap">
		<img
			src="https://img.shields.io/npm/dm/ngx-bootstrap.svg"
			alt="npm downloads">
	</a>
	<a href="https://travis-ci.org/valor-software/ngx-bootstrap">
		<img
			alt=""
			src="https://travis-ci.org/valor-software/ngx-bootstrap.svg?branch=development">
	</a>
	<a
		target="_blank"
		href="https://opencollective.com/ngx-bootstrap">
		<img src="https://opencollective.com/ngx-bootstrap/tiers/backer/badge.svg?label=backer&color=brightgreen">
	</a>
</p>

## Getting Started

This is an open source project that builds a cron builder component for Angular applications.
It supports Quartz cron string format for both input and output.
Inspired by this non-angular implementation.

## Installation
You can use either the npm or yarn command-line tool to install packages.
```
npm install --save ng-lightning
```

## Display the cron component
You need to import the CronBootstrapModule that you want to display by adding the following lines to your ngModule.

```
import { QuartzCronModule } from '@sbzen/cron';

@NgModule ({
	imports: [
		QuartzCronModule
	]
})
```
Add the cron component into yout template
```
<quartz-cron></quartz-cron>
```

## Usage & Demo
Main source of API documentation and usage scenarios available here: https://valor-software.com/ngx-bootstrap/.

### How to build lib for development

First time:
 - clone repository
 - `npm install`

Build the library:
 - `npm run build cron`

For local development run:
 - `npm start bootstrap-example`

## Compatibility

The only two required dependencies are Angular and cron-core.
The Bootstrap CSS is optional as you can use this component with your own styling.
Here is the versions compatibility list:

| Cron          |    Angular    |  Bootstrap CSS |
| ------------- | ------------- | -------------- |
| 1.1.1         | 7.x.x         | 4.x.x          |


## Further help

Visit the [Documentation](https://nx.dev/angular) to learn more.
