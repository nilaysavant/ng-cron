import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';

import { ReCron } from '@sbzen/re-cron';

import { localization, fullLocalization, secondsTabLocalization } from './constants';
import './localization.scss';

export const Localization = () => (
	<div>
		<h1 className="doc-title pb-3">
			Localization
		</h1>

		<p>
			We store all visible texts in a separate file and use them by default.
		</p>

		<p>
			If you need to change some text field or select option use <code>localization</code> prop to pass your version.
			<br/>
			Your localization version will be deeply merged with the default one, allowing you to override only what you want.
		</p>

		<ul>
			<li>
				<HashLink smooth to="#how-to-translate">
					How to translate the cron component?
				</HashLink>
			</li>
			<li>
				<HashLink smooth to="#all-localization-properties">
					All localization properties
				</HashLink>
			</li>
		</ul>

		<div
			id="how-to-translate"
			className="card">

			<div className="card-body">
				<h2 className="h5">
					How to translate the cron component?
				</h2>

				<p>
					Pass localization object to <code>localization</code> prop to have translated texts.
					<br/>
					See this example of the translation of the "Seconds" tab into Ukrainian.
				</p>

				<Highlight
					{...defaultProps}
					theme={oceanicNext}
					code={localization}
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

				<ReCron localization={secondsTabLocalization} />
			</div>
		</div>

		<div
			id="all-localization-properties" 
			className="mt-2 pt-3">

			<h2 className="h5">
				All localization properties
			</h2>

			<p>
				Use this manifest for full localization.
			</p>
			
			<Highlight
				{...defaultProps}
				theme={oceanicNext}
				code={fullLocalization}
				language="typescript">

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
);