import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';

import { ReCron } from '@sbzen/re-cron';

import { highlightSpecificHtml, wholeRedesignScss, wholeRedesignHtml, highlightSpecificScss, highlightSpecificVerticalHtml, highlightSpecificVerticalScss } from './constants';

export const CustomizationCssStyling = () => (
	<div>
		<h1 className="doc-title">CSS styling</h1>
		<p>
			This is a bootstrap 4 based component, but any time it can be used without any dependencies and will be absolutely unstyled.
		</p>

		There are two kind of customizations you can do:

		<ul>
			<li>
				<HashLink smooth to="#some-corrections">
					Some corrections
				</HashLink>
			</li>
			<li>
				<HashLink smooth to="#whole-redesign">
					Whole redesign
				</HashLink>
			</li>
		</ul>

		<div
			id="some-corrections"
			className="mt-4">

			<h2 className="doc-subtitle">Some corrections</h2>
			<p>
				Every html element has specific css class and you can use that to make some ui corrections.
				<br />
				It will work only if your styles will be added in global <code>styles.scss</code> file.
			</p>

			<div className="card">
				<div className="card-body">
					<h3 className="card-title h5">Highlight specific elements</h3>

					Let's highlight "Specific second" section and options "1" and "20"
					<Highlight
						{...defaultProps}
						theme={oceanicNext}
						code={highlightSpecificHtml}
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
					<Highlight
						{...defaultProps}
						theme={oceanicNext}
						code={highlightSpecificScss}
						language="scss">

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
						<div className="my-cron">
							<ReCron />
						</div>
					</div>
				</div>
			</div>

			<div className="card mt-3">
				<div className="card-body">
					<h3 className="card-title h5">Change the layout</h3>

					Let's make a vertical tabs
					<Highlight
						{...defaultProps}
						theme={oceanicNext}
						code={highlightSpecificVerticalHtml}
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
					<Highlight
						{...defaultProps}
						theme={oceanicNext}
						code={highlightSpecificVerticalScss}
						language="scss">

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
						<div className="my-vertical-cron">
							<ReCron />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			id="whole-redesign"
			className="mt-5">

			<h2 className="doc-subtitle">Whole redesign</h2>
			<p>
				The template uses the bootstrap 4 css classes without any custom styling or overridings.
				To customize the ui by yourself you need to use the <code>cssClassPrefix</code> prop and pass the class prefix.
				The prefix will be used in css classes generating, for example you passed <code>cssClassPrefix="my-"</code> as a result
				the bootstrap class will be transformed from <code>form-group</code> to <code>my-form-group</code>.
			</p>
			<Highlight
				{...defaultProps}
				theme={oceanicNext}
				code={wholeRedesignHtml}
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
			<Highlight
				{...defaultProps}
				theme={oceanicNext}
				code={wholeRedesignScss}
				language="scss">

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

			<div className="demo mt-4">
				<ReCron cssClassPrefix="my-" />
			</div>
		</div>
	</div>
);
