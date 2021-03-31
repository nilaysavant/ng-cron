import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';

import { ReCron, Tab } from '@sbzen/re-cron';

import { activeTabExample } from './constants';
import './usage-demo.scss';

type UsageDemoState = {
	cronValue: string;
	cronCode: string;
	tabs: Tab[],
	activeTab: Tab,
	disabledCron: boolean;
	disabledCronValue: string;
	disabledCronCode: string;
}

export class UsageDemo extends React.Component<{}, UsageDemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			tabs: [Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR],
			activeTab: Tab.SECONDS,
			cronValue: '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1',
			cronCode:
`import { ReCron } from '@sbzen/re-cron';

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
            <div>
                <div className="py-2">
                    <b>Cron Value: </b>
                    <code>{this.state.cronValue}</code>
                </div>
                <ReCron
                    value={this.state.cronValue}
                    onChange={(e) => this.handleChange(e)}>
                </ReCron>
            </div>
        );
    }
}`,
			disabledCron: false,
			disabledCronValue: '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1',
			disabledCronCode:
`import { ReCron } from '@sbzen/re-cron';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }

    private handleDisabledChange() {
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        return (
            <div>
                <b>Disabled: </b>
                <code>{this.state.disabled ? 'true' : 'false'}</code>
                <br />
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.handleDisabledChange()}>
                    Toggle state
                </button>
                <ReCron disabled={this.state.disabled}></ReCron>
            </div>
        );
    }
}`,
		}
	}

	render() {
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
								code={this.state.cronCode}
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
								<code>{this.state.cronValue}</code>
							</div>
							<div className="demo">
								<ReCron
									value={this.state.cronValue}
									onChange={(e) => this.handleCronChange(e)}>
								</ReCron>
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
								{this.state.tabs.map(tab => (
									<div
										key={tab}
										className="form-check form-check-inline">

										<input
											type="radio"
											className="form-check-input"
											name="activeTab"
											checked={this.state.activeTab === tab}
											onChange={() => this.setState({ activeTab: tab })}
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
									activeTab={this.state.activeTab}
									onTabChange={(tab) => this.setState({ activeTab: tab })}
									value={this.state.disabledCronValue}>
								</ReCron>
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
								code={this.state.disabledCronCode}
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
								<code>{this.state.disabledCron ? 'true' : 'false'}</code>
								<br />
								<button
									type="button"
									className="btn btn-sm btn-secondary"
									onClick={() => this.handleDisabledChange()}>
									Toggle state
								</button>
							</div>
							<div className="demo">
								<ReCron
									value={this.state.disabledCronValue}
									disabled={this.state.disabledCron}>
								</ReCron>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private handleCronChange(cronValue: string) {
		this.setState({ cronValue });
	}

	private handleDisabledChange() {
		this.setState({
			disabledCron: !this.state.disabledCron
		});
	}
};