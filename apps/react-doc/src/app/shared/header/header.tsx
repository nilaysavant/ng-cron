import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

type HeaderProps = {
	hideBar: boolean;
	barChanged?: () => void;
}

export class Header extends React.Component<HeaderProps> {
	constructor(props) {
		super(props);
	}

	render() {
		let bar: JSX.Element;
		if (!this.props.hideBar && this.props.barChanged) {
			bar = (
				<button
					className="btn btn-link link bar-link py-0 px-4 d-flex align-items-center"
					type="button"
					aria-label="toggle sidebar"
					onClick={() => this.props.barChanged()}>
					<i className="fas fa-bars"></i>
				</button>
			);
		}
		return (
			<header className="header d-flex justify-content-start align-items-stretch">
				{bar}

				<Link
					className="logo-link ml-3 d-flex align-items-center"
					to="/">
					<img
						src="assets/logo.png"
						alt="React Cron">
					</img>

					React Cron
				</Link>

				<a
					className="ml-auto git-link link d-flex align-items-center px-3"
					target="_blank"
					href="https://github.com/BzenkoSergey/ng-cron">

					<i className="fab fa-github"></i>
				</a>
			</header>
		);
	}
};