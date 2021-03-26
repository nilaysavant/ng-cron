import React from 'react';

import { Link } from 'react-router-dom';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import { ReCron, CronType, Tab } from '@sbzen/re-cron';

import { Header } from './../../shared/header/header';

import './home.scss';

type HomeState = {
	cronValue: string;
	features: {
		icon: string;
		title: string;
		desc: string;
	}[];
	code: string;
}

const localization = {
	tabs: {
		seconds: 'Секунды'
	},
	second: {
		every: {
			label: 'Каждая секунда'
		}
	},
	common: {
		month: {
			january: 'Январь'
		},
		dayOfWeek: {
			sunday: 'Воскресение'
		},
		dayOfMonth: {
			'1st': '1й'
		}
	}
}

export class Home extends React.Component<any, HomeState> {
	constructor(props) {
		super(props);

		this.state = {
			
			// cronValue: '2,0,4,3,1 0/1 3/2 ? * WED *',
			cronValue: '0 0 1,15 * 3',
			features: [
				{
					icon: 'fab fa-angellist',
					title: 'Native',
					desc: `
						As simple as React. Nothing else.
						The Bootstrap CSS is a optional dependency.
					`
				},
				{
					icon: 'fas fa-brush',
					title: 'Customization',
					desc: `You can customize the component as you want.`
				},
				{
					icon: 'fab fa-npm',
					title: 'Open-source and on npm',
					desc: `Use it directly in your project using npm.`
				}
			],
			code: 
`import { ReCron } from '@sbzen/re-cron';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cronValue: '2,0,4,3,1 0/1 3/2 ? * 4/5 *'
        };
    }

    private handleChange(cronValue: string) {
        this.setState({ cronValue });
    }

    render() {
        return (
            <div>
                <input
                   className="form-control"
                   readOnly
                   value={this.state.cronValue} />
			
                <ReCron
                    value={this.state.cronValue}
                    onChange={(e) => this.handleChange(e)}>
                </ReCron>
            </div>
        );
    }
}`
		}
	}

	protected handleChange(cronValue) {
		this.setState({ cronValue });
	}

	render() {
		return (
			<div className="home">
				<Header hideBar={true}></Header>

				<div className="short py-5 px-2 text-center">
					<div className="d-flex flex-column flex-md-row justify-content-center">
						<div className="pr-4 pt-2 order-1 order-md-0">
							<h1>React Quartz Cron</h1>
							UI widget for React

							<div className="pt-4 text-center">
								<Link
									className="btn btn-lg btn-light"
									to="/doc">
									Get Started
								</Link>
							</div>
						</div>

						<div>
							<img
								className="logo"
								src="assets/logo.png"
								alt="Angular Quartz Cron">
							</img>
						</div>
					</div>
				</div>

				<div className="container my-5">
					<div className="row py-4">
						{this.state.features.map((feature, i) => {
							return (
								<div
									key={i}
									className="col-sm-4">
									<div className="row">
										<div className="col-lg-4 icon text-center">
											<i className={feature.icon}></i>
										</div>
										<div className="col-lg-8 text-center text-lg-left">
											<h2>{feature.title}</h2>
											<p>{feature.desc}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="row mt-5">
						<div className="col-md-5">
							<Highlight
								{...defaultProps}
								theme={oceanicNext}
								code={this.state.code}
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
						<div className="col-md-7">
							<input
								className="form-control mb-4"
								readOnly
								value={this.state.cronValue} />

							<ReCron
								// hideTabs={true}
								// activeTab={Tab.MINUTES}
								// tabs={[Tab.DAY, Tab.MINUTES, Tab.SECONDS]}
								value={this.state.cronValue}
								cronType={CronType.UNIX}
								// localization={localization}
								onChange={(e) => this.handleChange(e)}>
							</ReCron>
						</div>
					</div>
				</div>

				<div className="footer p-3 text-center">
					© 2019 - present. Code licensed under the MIT License.
				</div>
			</div>
		);
	}
};