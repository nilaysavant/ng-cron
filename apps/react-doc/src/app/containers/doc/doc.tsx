import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './../../shared/header/header';
import { Nav } from './../../shared/nav/nav';
import { DeviceService } from './../../shared/device.service';

import { GetStarted } from './get-started/get-started';
import { ApiReference } from './api-reference/api-reference';
import { Compatibility } from './compatibility/compatibility';
import { CustomizationVisibilityProps } from './customization/visibility-props/visibility-props';
import { CustomizationCssStyling } from './customization/css-styling/css-styling';
import { Localization } from './localization/localization';
import { CronFormat } from './cron-format/cron-format';
import { UsageDemo } from './usage-demo/usage-demo';

import './doc.scss';

type HomeState = {
	showSidebar: boolean|null;
}

export class Doc extends React.Component<{}, HomeState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			showSidebar: null
		}
	}

	render() {
		const showSidebar = this.state.showSidebar;
		const sideBarClasses = `sidebar pl-0 ${showSidebar || showSidebar === null ? 'md-show' : ''} ${showSidebar ? 'show' : ''}`;
		const contentClasses = `sidebar-bg position-absolute w-100 h-100 d-none d-md-none ${showSidebar ? 'd-block' : ''}`;
		return (
			<div className="doc h-100">
				<Header
					hideBar={false}
					barChanged={() => this.handleSidebar()}>
				</Header>

				<div className="container-fluid content-height">
					<div className="row h-100">
						<div className={sideBarClasses}>
							<Nav></Nav>
						</div>

						<div
							className={contentClasses}
							onClick={() => this.hideSideBar()}>
						</div>

						<div className="col content mh-100">
							<Switch>
								<Route exact path={'/doc'}>
									<Redirect to={'/doc/get-started'} />
								</Route>
								<Route path={'/doc/get-started'}>
									<GetStarted />
								</Route>
								<Route path={'/doc/api-reference'}>
									<ApiReference />
								</Route>
								<Route path={'/doc/compatibility'}>
									<Compatibility />
								</Route>
								<Route path={'/doc/localization'}>
									<Localization />
								</Route>
								<Route path={'/doc/customization/visibility-props'}>
									<CustomizationVisibilityProps />
								</Route>
								<Route path={'/doc/customization/css-styling'}>
									<CustomizationCssStyling />
								</Route>

								<Route path={'/doc/customization'}>
									<Redirect to="/doc/customization/visibility-props"/>
								</Route>
								<Route path={'/doc/cron-format'}>
									<CronFormat />
								</Route>
								<Route path={'/doc/usage-demo'}>
									<UsageDemo />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private handleSidebar() {
		const isTablet = new DeviceService().isTablet();
		let showSidebar: boolean;
		if (!isTablet) {
			const close = this.state.showSidebar || this.state.showSidebar === null;
			showSidebar = close ? false : null;
		} else {
			showSidebar = !this.state.showSidebar;
		}
		
		this.setState({
			showSidebar: showSidebar
		});
	}

	private hideSideBar() {
		this.setState({
			showSidebar: false
		});
	}
};