import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { DeviceService } from './../../shared/device.service';
import { Header } from './../../shared/header/header';
import { Nav } from './../../shared/nav/nav';

import { CustomizationVisibilityProps } from './customization/visibility-props/visibility-props';
import { CustomizationCssStyling } from './customization/css-styling/css-styling';
import { Compatibility } from './compatibility/compatibility';
import { ApiReference } from './api-reference/api-reference';
import { Localization } from './localization/localization';
import { GetStarted } from './get-started/get-started';
import { CronFormat } from './cron-format/cron-format';
import { UsageDemo } from './usage-demo/usage-demo';

import './doc.scss';

export const Doc = () => {
	const [showSidebar, setShowSidebar] = useState(null);
	const sideBarClasses = `sidebar pl-0 ${showSidebar || showSidebar === null ? 'md-show' : ''} ${showSidebar ? 'show' : ''}`;
	const contentClasses = `sidebar-bg position-absolute w-100 h-100 d-none d-md-none ${showSidebar ? 'd-block' : ''}`;

	const handleSidebar = () => {
		const isTablet = new DeviceService().isTablet();
		let state: boolean;
		if (!isTablet) {
			const close = showSidebar || showSidebar === null;
			state = close ? false : null;
		} else {
			state = !showSidebar;
		}
		setShowSidebar(state);
	};

	return (
		<div className="doc h-100">
			<Header
				hideBar={false}
				barChanged={handleSidebar}>
			</Header>

			<div className="container-fluid content-height">
				<div className="row h-100">
					<div className={sideBarClasses}>
						<Nav></Nav>
					</div>

					<div
						className={contentClasses}
						onClick={() => setShowSidebar(false)}>
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
};
