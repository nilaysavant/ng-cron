import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import {
	ValueProp,
	CssClassPrefixProp,
	DisabledProp,
	LocalizationProp,
	TabsProp,
	HideTabsProp,
	ActiveTabProp,
	OnChangeProp,
	OnTabChangeProp
} from './props';

import { tabExample, cronLocalizationExample } from './constants';

import './api-reference.scss';

const reQuartzCron = [
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

export const ApiReference = () => (
	<div className="api-reference">
		<h1 className="doc-title">
			API Reference
		</h1>

		<ul>
			<li>
				<HashLink smooth to="#re-quartz-cron">
					ReQuartzCron and ReCron
				</HashLink>
			</li>
			<li>
				<HashLink smooth to="#re-unix-cron">
					ReUnixCron
				</HashLink>
			</li>
			<li>
				<HashLink smooth to="#tab">
					Tab
				</HashLink>
			</li>
			<li>
				<HashLink smooth to="#cron-localization">
					CronLocalization
				</HashLink>
			</li>
		</ul>

		<div
			className="card mt-3"
			id="re-quartz-cron">

			<div className="card-header">
				<h2 className="h5 m-0 mr-2 d-inline-block">ReQuartzCron / ReCron</h2>
				<div className="h5 m-0 d-inline-block">
					<span className="badge badge-success">Component</span>
				</div>
			</div>
			<ul className="list-group list-group-flush">
				{reQuartzCron.map((Prop, i) => (
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
				{reQuartzCron.map((Prop, i) => (
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

		<div
			className="card mt-3"
			id="cron-localization">

			<div className="card-header">
				<h2 className="h5 m-0 mr-2 d-inline-block">CronLocalization</h2>
				<div className="h5 m-0 mb-3 d-inline-block">
					<span className="badge badge-info">Type</span>
				</div>

				<Highlight
					{...defaultProps}
					theme={oceanicNext}
					code={cronLocalizationExample}
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