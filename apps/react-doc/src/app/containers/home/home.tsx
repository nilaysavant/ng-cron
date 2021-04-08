import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import { ReCron } from '@sbzen/re-cron';

import { Header } from './../../shared/header/header';
import { features, example } from './constants';

import './home.scss';

export const Home = () => {
	const [cronValue, setCronValue] = useState('2,0,4,3,1 0/1 3/2 ? * 4/5 *');

	return (
		<div className="home">
			<Header hideBar={true}></Header>

			<div className="short py-5 px-2 text-center">
				<div className="d-flex flex-column flex-md-row justify-content-center">
					<div className="pr-4 pt-2 order-1 order-md-0">
						<h1>React Cron Widget</h1>
						Quartz / Unix Cron expressions

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
							alt="React Cron">
						</img>
					</div>
				</div>
			</div>

			<div className="container my-5">
				<div className="row py-4">
					{features.map((feature, i) => {
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
							code={example}
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
							value={cronValue} />

						<ReCron
							value={cronValue}
							onChange={setCronValue} />
					</div>
				</div>
			</div>

			<div className="footer p-3 text-center">
				© 2019-{new Date().getFullYear()} - present. Code licensed under the MIT License.
			</div>
		</div>
	);
}