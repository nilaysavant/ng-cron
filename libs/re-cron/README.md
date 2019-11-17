# Quartz Cron Component - React

[React](https://reactjs.org/) cron widget built from the ground up using only [Bootstrap 4](https://getbootstrap.com/) CSS.

Please check our [demo & documentation](https://bzenkosergey.github.io/ng-cron/react/) and the list of
[issues](https://github.com/bzenkosergey/ng-cron/issues) to see all the things we are working on. Feel free to make comments there.

<p align="center">
	<a href="https://bzenkosergey.github.io/ng-cron/react/">
		<img
			width="200"
			src="https://bzenkosergey.github.io/ng-cron/react/assets/logo.png"
			alt="re-cron">
	</a>
</p>

<p align="center">
	<a href="https://badge.fury.io/js/%40sbzen%2Fre-cron">
		<img
			src="https://badge.fury.io/js/%40sbzen%2Fre-cron.svg"
			alt="npm version">
	</a>
	<a href="https://npmjs.org/%40sbzen%2Fre-cron">
		<img
			src="https://img.shields.io/npm/dm/%40sbzen%2Fre-cron.svg"
			alt="npm downloads">
	</a>
</p>

## Getting Started

This is an open source project that builds a cron builder component for React applications.
It supports Quartz cron string format for both input and output.
Inspired by this [non-react](https://www.freeformatter.com/cron-expression-generator-quartz.html) implementation.

## Installation
You can use either the npm or yarn command-line tool to install packages.
```
npm install --save @sbzen/re-cron
```

## Display the cron component
Import and add the cron component into your jsx/tsx.

```
import { ReCron } from '@sbzen/re-cron';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cronValue: '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1'
        };
    }

    private handleChange(cronValue: string) {
        this.setState({ cronValue });
    }

    render() {
        return (
			<ReCron
				value={this.state.cronValue}
				onChange={(e) => this.handleChange(e)}>
			</ReCron>
        );
    }
}
```

## Usage & Demo
Main source of API documentation and usage scenarios available here: https://bzenkosergey.github.io/ng-cron/react/.

### How to build lib for development

First time:
 - clone repository
 - `npm install`

Build the library:
 - `npm run build re-cron`

For local development run:
 - `npm start react-doc`

## Compatibility

The only two required dependencies are React and cron-core.
The Bootstrap CSS is optional as you can use this component with your own styling.
Here is the versions compatibility list:

| Re Cron          |    React    |  Bootstrap CSS |
| -------------    | ------------- | -------------- |
| 0.0.1            | 16.x.x         | 4.x.x          |
