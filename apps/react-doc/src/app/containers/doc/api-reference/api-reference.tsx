import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import {
	ValueProp,
	CssClassPrefixProp,
	DisabledProp,
	CronTypeProp,
	LocalizationProp,
	TabsProp,
	HideTabsProp,
	ActiveTabProp,
	OnChangeProp,
	OnTabChangeProp
} from './props';

import { cronTypeExample, tabExample } from './constants';

import './api-reference.scss';

export class ApiReference extends React.Component {
	private reQuartzCron = [
		ValueProp,
		CssClassPrefixProp,
		DisabledProp,
		LocalizationProp,
		TabsProp,
		HideTabsProp,
		ActiveTabProp,
		OnChangeProp,
		OnTabChangeProp
	];

	private reCronProps = [
		CronTypeProp,
		...this.reQuartzCron
	];

	private reUnixCron = [
		...this.reQuartzCron
	];

	render() {
		return (
			<div className="api-reference">
				<h1 className="doc-title">
					API Reference
				</h1>

				<ul>
					<li>
						<HashLink smooth to="#re-cron">
							ReCron
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#re-quartz-cron">
							ReQuartzCron
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#re-unix-cron">
							ReUnixCron
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#cron-type">
							CronType
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#tab">
							Tab
						</HashLink>
					</li>
				</ul>

				<div
					className="card mt-3"
					id="re-cron">

					<div className="card-header">
						<h2 className="h5 m-0 mr-2 d-inline-block">ReCron</h2>
						<div className="h5 m-0 d-inline-block">
							<span className="badge badge-success">Component</span>
						</div>
					</div>
					<ul className="list-group list-group-flush">
						{this.reCronProps.map((Prop, i) => (
							<li
								className="list-group-item"
								key={i}>
								<Prop/>
							</li>
						))}
					</ul>
				</div>

				<div
					className="card mt-3"
					id="re-quartz-cron">

					<div className="card-header">
						<h2 className="h5 m-0 mr-2 d-inline-block">ReQuartzCron</h2>
						<div className="h5 m-0 d-inline-block">
							<span className="badge badge-success">Component</span>
						</div>
					</div>
					<ul className="list-group list-group-flush">
						{this.reQuartzCron.map((Prop, i) => (
							<li
								className="list-group-item"
								key={i}>
								<Prop/>
							</li>
						))}
					</ul>
				</div>

				<div
					className="card mt-3"
					id="re-unix-cron">
		
					<div className="card-header">
						<h2 className="h5 m-0 mr-2 d-inline-block">ReUnixCron</h2>
						<div className="h5 m-0 d-inline-block">
							<span className="badge badge-success">Component</span>
						</div>
					</div>
					<ul className="list-group list-group-flush">
						{this.reUnixCron.map((Prop, i) => (
							<li
								className="list-group-item"
								key={i}>
								<Prop/>
							</li>
						))}
					</ul>
				</div>

				<div
					className="card mt-3"
					id="cron-type">

					<div className="card-header">
						<h2 className="h5 m-0 mr-2 d-inline-block">CronType</h2>
						<div className="h5 m-0 mb-3 d-inline-block">
							<span className="badge badge-info">Enum</span>
						</div>

						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={cronTypeExample}
							language="tsx">

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
					</div>
				</div>

				<div
					className="card mt-3"
					id="tab">

					<div className="card-header">
						<h2 className="h5 m-0 mr-2 d-inline-block">Tab</h2>
						<div className="h5 m-0 mb-3 d-inline-block">
							<span className="badge badge-info">Enum</span>
						</div>

						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={tabExample}
							language="tsx">

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
					</div>
				</div>
			</div>
		);
	}
};