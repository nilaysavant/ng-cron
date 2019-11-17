import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import { ReCron } from '@sbzen/re-cron';

import './usage-demo.scss';

type UsageDemoState = {
	cronValue: string;
	cronCode: string;
	disabledCron: boolean;
	disabledCronValue: string;
	disabledCronCode: string;
}

export class UsageDemo extends React.Component<{}, UsageDemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
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

				<p>
					The cron component works as a simple form control.
				</p>

				<h2 className="doc-subtitle mt-4">Form control</h2>
				<Highlight
					{...defaultProps}
					theme={oceanicNext}
					code={this.state.cronCode}
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

				<h2 className="doc-subtitle mt-5">Disabled State</h2>
				<Highlight
					{...defaultProps}
					theme={oceanicNext}
					code={this.state.disabledCronCode}
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