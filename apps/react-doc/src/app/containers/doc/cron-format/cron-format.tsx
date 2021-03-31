import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';
import { ReCron, ReQuartzCron, ReUnixCron, CronType } from '@sbzen/re-cron';

import { basicCron, quartzCron, unixCron } from './constants';
import './cron-format.scss';

type CronFormatState = {
	unixCron: string;
	quartzCron: string;
};

export class CronFormat extends React.Component<{}, CronFormatState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			unixCron: '0 22 * * */3',
			quartzCron: '2,0,4,3,1 0/1 3/2 ? * WED *'
		};
	}

	render() {
		return (
			<div>
				<h1 className="doc-title">
					Cron Format
				</h1>

				<p>
					ReCron component supports quartz and unix cron expressions.
				</p>
				<ul>
					<li>
						<HashLink smooth to="#basic-usage">
							Basic usage
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#quartz-cron">
							Quartz cron
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#unix-cron">
							Unix cron
						</HashLink>
					</li>
				</ul>

				<div
					id="basic-usage"
					className="mt-4">

					<h2 className="doc-subtitle">Basic usage</h2>
					<p>
						ReCron has <code>cronType</code> prop that allows to switch component from using quartz to unix format.
						<br />
						The quartz format is set as default one.
					</p>

					<div className="card">
						<div className="card-body">
							<h3 className="card-title h5">Using cronType prop</h3>

							<Highlight
								{...defaultProps}
								theme={oceanicNext}
								code={basicCron}
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

							<h3 className="doc-subtitle h6">Example:</h3>
							<input
								className="form-control mb-4"
								readOnly
								value={this.state.unixCron} />

							<div className="demo">
								<ReCron
									cronType={CronType.UNIX}
									value={this.state.unixCron}
									onChange={unixCron => this.setState({ unixCron })}>
								</ReCron>
							</div>
						</div>
					</div>
				</div>

				<div
					id="quartz-cron"
					className="mt-4">

					<h2 className="doc-subtitle">Quartz cron</h2>
					<p>
						As Quartz is a default format for ReCron component you can use it as it is.
						<br />
						There is one more component that handles only quartz format so if you don't need unix format - use this one.
					</p>

					<div className="card">
						<div className="card-body">
							<Highlight
								{...defaultProps}
								theme={oceanicNext}
								code={quartzCron}
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

							<ReQuartzCron value={this.state.quartzCron}></ReQuartzCron>
						</div>
					</div>
				</div>

				<div
					id="unix-cron"
					className="mt-4">

					<h2 className="doc-subtitle">Unix cron</h2>
					<p>
						To use only unix format use ReUnixCron component.
					</p>

					<div className="card">
						<div className="card-body">
							<Highlight
								{...defaultProps}
								theme={oceanicNext}
								code={unixCron}
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

							<ReUnixCron value={this.state.unixCron}></ReUnixCron>
						</div>
					</div>
				</div>
			</div>
		);
	}
};