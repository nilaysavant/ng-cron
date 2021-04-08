import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';

import { ReCron, Tab } from '@sbzen/re-cron';

import { activeTabExample, formControlExample, disabledExample } from './constants';

export const UsageDemo = () => {
	const [tabs] = useState([Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]);
	const [activeTab, setActiveTab] = useState(Tab.SECONDS);
	const [cronValue, setCronValue] = useState('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');
	const [disabledCron, setDisabledCron] = useState(false);
	const [disabledCronValue] = useState('0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1');

	return (
		<div>
			<h1 className="doc-title">
				Usage & Demo
			</h1>

			<ul>
				<li>
					<HashLink smooth to="#form-control">
						Form control
					</HashLink>
				</li>
				<li>
					<HashLink smooth to="#active-tab">
						Active tab
					</HashLink>
				</li>
				<li>
					<HashLink smooth to="#disabled-state">
						Disabled state
					</HashLink>
				</li>
			</ul>

			<div id="form-control">
				<h2 className="doc-subtitle mt-4">Form control</h2>
				<p>
					The cron component works as a simple form control.
				</p>

				<div className="card">
					<div className="card-body">
						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={formControlExample}
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

						<div className="py-2">
							<b>Cron Value: </b>
							<code>{cronValue}</code>
						</div>
						<div className="demo">
							<ReCron
								value={cronValue}
								onChange={setCronValue} />
						</div>
					</div>
				</div>
			</div>

			<div
				id="active-tab"
				className="pt-3 mt-4">

				<h2 className="doc-subtitle">Active tab</h2>
				<p>
					Use <code>activeTab</code> prop to manualy activate tab you want.
				</p>

				<div className="card">
					<div className="card-body">
						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={activeTabExample}
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

						<div className="py-3">
							<b className="mr-2">Tabs:</b>
							{tabs.map(tab => (
								<div
									key={tab}
									className="form-check form-check-inline">

									<input
										type="radio"
										className="form-check-input"
										name="activeTab"
										checked={activeTab === tab}
										onChange={() => setActiveTab(tab)}
										id={`active-tab-${tab}`}/>

									<label
										className="form-check-label"
										htmlFor={`active-tab-${tab}`}>
										{tab.toLowerCase()}
									</label>
								</div>
							))}
						</div>

						<div className="demo">
							<ReCron
								activeTab={activeTab}
								onTabChange={(tab) => setActiveTab(tab)}
								value={disabledCronValue} />
						</div>
					</div>
				</div>
			</div>

			<div
				id="disabled-state"
				className="pt-3 mt-4">

				<h2 className="doc-subtitle">Disabled State</h2>
				<p>
					Use <code>disabled</code> prop to control component's state.
				</p>

				<div className="card">
					<div className="card-body">
						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={disabledExample}
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

						<div className="py-2">
							<b>Disabled: </b>
							<code>{disabledCron ? 'true' : 'false'}</code>
							<br />
							<button
								type="button"
								className="btn btn-sm btn-secondary"
								onClick={() => setDisabledCron(!disabledCron)}>
								Toggle state
							</button>
						</div>
						<div className="demo">
							<ReCron
								value={disabledCronValue}
								disabled={disabledCron} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};