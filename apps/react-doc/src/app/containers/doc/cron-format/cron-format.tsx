import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';
import { ReCron, ReUnixCron } from '@sbzen/re-cron';

import { basicCronExample, unixCronExample } from './constants';
import './cron-format.scss';

export const CronFormat = () => {
	const [unixCron] = useState('5 0 * 8 *');
	const [quartzCron, setQuartzCron] = useState('2,0,4,3,1 0/1 3/2 ? * WED *');

	return (
		<div>
			<h1 className="doc-title">
				Cron Format
			</h1>

			<p>
				This library supports quartz and unix cron expressions.
			</p>
			<ul>
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
				id="quartz-cron"
				className="mt-4">

				<h2 className="doc-subtitle">Quartz cron</h2>
				<p>
					As Quartz is the default format for ReCron component, you can use it as is.
					<br />
					The ReCron is an alias for the ReQuartzCron component.
				</p>

				<div className="card">
					<div className="card-body">
						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={basicCronExample}
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
							value={quartzCron} />

						<div className="demo">
							<ReCron
								value={quartzCron}
								onChange={setQuartzCron} />
						</div>
					</div>
				</div>
			</div>

			<div
				id="unix-cron"
				className="mt-4">

				<h2 className="doc-subtitle">Unix cron</h2>
				<p>
					The is ReUnixCron component to work with unix cron format.
				</p>

				<div className="card">
					<div className="card-body">
						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={unixCronExample}
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

						<div className="demo">
							<ReUnixCron value={unixCron} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};