import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';
import { tabsManagingExample } from './constants';
import { ReCron, Tab } from '@sbzen/re-cron';

import './visibility-props.scss';

type CustomizationState = {
	tabsCronValue: string;
	tabsManagingTabs: Tab[],
	tabsVisibility: boolean
};

export class CustomizationVisibilityProps extends React.Component<{}, CustomizationState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			tabsCronValue: '2,0,4,3,1 0/1 3/2 ? * 4/5 *',
			tabsManagingTabs: [Tab.MINUTES, Tab.HOURS],
			tabsVisibility: true
		};
	}

	render() {
		return (
			<div>
				<h1 className="doc-title">Visibility props</h1>
				<p>
					There are few props to control elements visibility:
				</p>

				<ul>
					<li>
						<HashLink smooth to="#tabs-managing">
							Tabs managing
						</HashLink>
					</li>
					<li>
						<HashLink smooth to="#tabs-visibility">
							Tabs visibility
						</HashLink>
					</li>
				</ul>

				<div
					id="tabs-managing"
					className="card">

					<div className="card-body">

						<h2 className="doc-subtitle h5">
							Tabs managing
						</h2>
						<p>
							Use <code>tabs</code> prop to pass tabs you want to show.
							<br/>
							The order of the tabs depends on the order of the tab list you specify.
						</p>

						<p>
							<b>Available values:</b>
							<br/>
							<code>Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR</code>
						</p>

						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={tabsManagingExample}
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
							value={this.state.tabsCronValue} />

						<div className="mb-3">
							<b className="mr-2">Visible tabs:</b>
							{[Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.YEAR].map(tab => (
								<div
									key={tab}
									className="form-check form-check-inline">
									<input
										type="checkbox"
										className="form-check-input"
										checked={this.isVisinleTab(tab)}
										onChange={() => this.toggleTab(tab)}
										id={`tabs-managing-${tab}`}/>

									<label
										className="form-check-label"
										htmlFor={`tabs-managing-${tab}`}>
										{tab.toLowerCase()}
									</label>
								</div>
							))}
						</div>

						<ReCron
							tabs={this.state.tabsManagingTabs}
							value={this.state.tabsCronValue}
							onChange={tabsCronValue => this.setState({ tabsCronValue })}>
						</ReCron>
					</div>
				</div>

				<div
					id="tabs-visibility"
					className="card mt-3 mb-5">

					<div className="card-body">

						<h2 className="doc-subtitle h5">Tabs visibility</h2>
						<p>
							Use <code>hideTabs</code> prop to hide tab buttons.
						</p>

						<Highlight
							{...defaultProps}
							theme={oceanicNext}
							code={'<ReCron hideTabs={true}></ReCron>'}
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

						<button
							className="btn btn-primary mb-3"
							type="button"
							onClick={() => this.toogleTabsVisibility()}>
							{!this.state.tabsVisibility && 'Hide tabs'}
							{this.state.tabsVisibility && 'Show tabs'}
						</button>

						<ReCron hideTabs={this.state.tabsVisibility}></ReCron>
					</div>
				</div>
			</div>
		);
	}

	private toogleTabsVisibility() {
		this.setState({
			tabsVisibility: !this.state.tabsVisibility
		});
	}

	private toggleTab(tab: Tab) {
		if (this.isVisinleTab(tab)) {
			const tabsManagingTabs = this.state.tabsManagingTabs.filter(t => t !== tab);
			this.setState({ tabsManagingTabs });
			return;
		}
		this.setState({
			tabsManagingTabs: [
				...this.state.tabsManagingTabs,
				tab
			]
		});
	}

	private isVisinleTab(tab: Tab) {
		return this.state.tabsManagingTabs.includes(tab);
	}
};
