import React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './containers/home/home';
import { Doc } from './containers/doc/doc';

export const App = () => (
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

export default App;
