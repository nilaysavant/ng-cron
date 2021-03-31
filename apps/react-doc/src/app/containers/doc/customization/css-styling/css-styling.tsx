import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import { HashLink } from 'react-router-hash-link';

import { ReCron } from '@sbzen/re-cron';

import './css-styling.scss';

type CustomizationState = {
	highlightSpecificHtml: string;
	highlightSpecificScss: string;
	highlightSpecificVerticalHtml: string;
	highlightSpecificVerticalScss: string;
	wholeRedesignHtml: string;
	wholeRedesignScss: string;
};

export class CustomizationCssStyling extends React.Component<{}, CustomizationState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			highlightSpecificHtml:
`<div className="my-cron">
    <ReCron></ReCron>
</div>`,
			highlightSpecificScss:
`.my-cron [tab-name="SECONDS"] {
   .c-and {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 5px;

        &-item[item-value="1"],
        &-item[item-value="20"] {
            .c-and-item-check {
                background-color: red;
                border-radius: 5px;
                color: #fff;
                padding-left: 1.5rem;
            }
        }
    }
}`,
			highlightSpecificVerticalHtml: 
`<div className="my-vertical-cron">
    <ReCron></ReCron>
</div>`,

			highlightSpecificVerticalScss:
`.my-vertical-cron .c-host {
    display: flex;
    flex-direction: row;

    .c-tabs {
        flex-direction: column;
        border: 0;
        border-right: 1px solid #ccc;

        .c-tab {
            text-align: left;
            border: 0;
            border-radius: 0;
        }
    }

    .c-tab-content {
        padding-top: .5rem;
        padding-left: 1rem;
    }
}`,
			wholeRedesignHtml: '<ReCron cssClassPrefix="my-"></ReCron>',
			wholeRedesignScss:
`$prefix: '.my';

#{$prefix}-row {
    overflow: hidden;

    #{$prefix}-col-1 {
        width: calc(100% / 12);
        float: left;
    }

    #{$prefix}-col-2 {
        width: calc(100% / 6);
        float: left;
    }
}

#{$prefix}-form-inline {
    display: flex;
    flex-direction: row;
}

#{$prefix}-form-control {
    margin: 0 .2rem;
}

#{$prefix}-form-check-label {
    padding-left: .4rem;
}`
		};
	}

	render() {
		return (
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
								code={this.state.highlightSpecificHtml}
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
								code={this.state.highlightSpecificScss}
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
									<ReCron></ReCron>
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
								code={this.state.highlightSpecificVerticalHtml}
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
								code={this.state.highlightSpecificVerticalScss}
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
									<ReCron></ReCron>
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
						code={this.state.wholeRedesignHtml}
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
						code={this.state.wholeRedesignScss}
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
						<ReCron cssClassPrefix="my-"></ReCron>
					</div>
				</div>
			</div>
		);
	}
};
