import React from 'react';

import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import { ReCron } from '@sbzen/re-cron';

import './get-started.scss';

type GetStartedState = {
	template: string;
}

export class GetStarted extends React.Component<{}, GetStartedState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			template: 
`import { ReCron } from '@sbzen/re-cron';

export class App extends React.Component {
    render() {
        return (<ReCron></ReCron>);
    }
}`
		}
	}

	render() {
		return (
			<div>
				<h1 className="doc-title">
					Get Started
				</h1>

				<p>
					This is an open source project that builds a cron builder component for React applications.
					<br />
					It supports{' '}
					<a
						target="blank"
						href="http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html">
						Quartz cron string format
					</a>
					{' '}for both input and output.
					<br />
					Inspired by this{' '}
					<a
						target="blank"
						href="https://www.freeformatter.com/cron-expression-generator-quartz.html">
						non-react
					</a>
					{' '}implementation.
				</p>

				<h2 className="doc-subtitle mt-5">Installation</h2>
				<p>
					You can use either the npm or yarn command-line tool to install packages.
					<br />
					<code>npm install --save @sbzen/re-cron</code>
				</p>

				<h2 className="doc-subtitle mt-5">Display the cron component</h2>
				<p>
					Import and add the cron component into your jsx/tsx.
				</p>

				<Highlight
					{...defaultProps}
					theme={oceanicNext}
					code={this.state.template}
					language="jsx">

					{({ className, style, tokens, getLineProps, getTokenProps }) => (
						<pre className={className} style={style}>
						{tokens.map((line, i) => (
							<div {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} />
							))}
							</div>
						))}
						</pre>
					)}
				</Highlight>
				<h2 className="doc-subtitle mt-5">UI widget</h2>
				<p>
					As a result you will have this widget
				</p>

				<div className="demo">
					<ReCron></ReCron>
				</div>
			</div>
		);
	}
};