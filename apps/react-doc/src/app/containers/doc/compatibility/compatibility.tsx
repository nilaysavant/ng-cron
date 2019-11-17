import React from 'react';

import './compatibility.scss';

export class Compatibility extends React.Component {
	render() {
		return (
			<div>
				<h1 className="doc-title">
					Compatibility
				</h1>

				<p className="mt-4">
					The only two required dependencies are React and cron-core.
					<br />
					The Bootstrap CSS is optional as you can use this component with your own styling.
				</p>

				<table className="table mt-4">
					<thead>
						<tr>
							<th>Ng-Cron</th>
							<th>React</th>
							<th>Bootstrap CSS</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>0.0.1</td>
							<td>16.x.x</td>
							<td>4.x.x</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
};