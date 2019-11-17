import React from 'react';

import './app.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './containers/home/home';
import { Doc } from './containers/doc/doc';

type AppState = {
	value: string
}

export class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			value: '3-8 0,1,2,13 0 * *'
		}
	}

	protected handleChange(value) {
		this.setState({ value });
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route path="/doc">
						<Doc />
					</Route>
				</Switch>
			</Router>
		);
	}
};

export default App;
