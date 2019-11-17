import React from 'react';

import './api-reference.scss';

export class ApiReference extends React.Component {
	render() {
		return (
			<div>
				<h1 className="doc-title">
					API Reference
				</h1>

				<h2 className="doc-subtitle mt-4">ReCron</h2>

				<div className="h4">
					<span className="badge badge-success">Component</span>
				</div>

				<div className="card mt-3">
					<div className="card-header h5">
						Props
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<div className="row">
								<div className="col-2">
									<code>value</code>
								</div>
								<div className="col">
									The value will be used to prefill the cron controls
									<br />
									<br />
									<b>Type: </b> <code>string</code>
									<br />
									<b>Default value: </b> empty string <code>""</code>
								</div>
							</div>
						</li>
						<li className="list-group-item">
							<div className="row">
								<div className="col-2">
									<code>cssClassPrefix</code>
								</div>
								<div className="col">
									The prefix will be used in css classes generating, for example you passed <code>cssClassPrefix="my-"</code> as a result
									the bootstrap class will be transformed from <code>form-group</code> to <code>my-form-group</code>.
									<br />
									<br />
									<b>Type: </b> <code>string</code>
									<br />
									<b>Default value: </b> empty string <code>""</code>
								</div>
							</div>
						</li>
						<li className="list-group-item">
							<div className="row">
								<div className="col-2">
									<code>disabled</code>
								</div>
								<div className="col">
									The disabled state.
									<br />
									<br />
									<b>Type: </b> <code>boolean</code>
									<br />
									<b>Default value: </b> <code>false</code>
								</div>
							</div>
						</li>
						<li className="list-group-item">
							<div className="row">
								<div className="col-2">
									<code>onChange</code>
								</div>
								<div className="col">
									The callback is triggered when the user changes the cron value using the UI.
									<br />
									Event payload is the string of the newly cron value.
									<br />
									<b>Type: </b> <code>(value: string) => void</code>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};