import React from 'react';

import { NavLink } from 'react-router-dom';

import './nav.scss';

export class Nav extends React.Component {
	render() {
		return (
			<nav className="navigation nav flex-column h-100 pt-3">
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/get-started">
					Get Started
				</NavLink>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/usage-demo">
					Usage & Demo
				</NavLink>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/cron-format">
					Cron Format
				</NavLink>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/customization">
					Customization
				</NavLink>
				<ul>
					<li>
						<NavLink
							className="nav-link"
							activeClassName="active"
							to="/doc/customization/visibility-props">
							Visibility props
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav-link"
							activeClassName="active"
							to="/doc/customization/css-styling">
							CSS styling
						</NavLink>
					</li>
				</ul>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/localization">
					Localization
				</NavLink>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/api-reference">
					API reference
				</NavLink>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/doc/compatibility">
					Compatibility
				</NavLink>
			</nav>
		);
	}
};