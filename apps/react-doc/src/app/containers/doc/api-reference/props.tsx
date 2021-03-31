import React from 'react';
import { HashLink } from 'react-router-hash-link';

export const ValueProp = () => (
	<div className="row">
		<div className="col-2">
			<code>value</code>
		</div>
		<div className="col">
			The value will be used to prefill the cron controls
			<br />
			<b>Type: </b> <code>string</code>
			<br />
			<b>Default value: </b> empty string <code>""</code>
		</div>
	</div>
);

export const CssClassPrefixProp = () => (
	<div className="row">
		<div className="col-2">
			<code>cssClassPrefix</code>
		</div>
		<div className="col">
			The prefix will be used in css classes generating, for example you passed <code>cssClassPrefix="my-"</code> as a result
			the bootstrap class will be transformed from <code>form-group</code> to <code>my-form-group</code>.
			<br />
			<b>Type: </b> <code>string</code>
			<br />
			<b>Default value: </b> empty string <code>""</code>
		</div>
	</div>
);

export const DisabledProp = () => (
	<div className="row">
		<div className="col-2">
			<code>disabled</code>
		</div>
		<div className="col">
			The disabled state.
			<br />
			<b>Type: </b> <code>boolean</code>
			<br />
			<b>Default value: </b> <code>false</code>
		</div>
	</div>
);

export const CronTypeProp = () => (
	<div className="row">
		<div className="col-2">
			<code>cronType</code>
		</div>
		<div className="col">
			Cron Type: Quartz / Unix formats
			<br />
			<b>Type: </b> <HashLink smooth to="#cron-type">CronType</HashLink>
			<br />
			<b>Default value: </b> <code>CronType.QUARTZ</code>
		</div>
	</div>
);

export const LocalizationProp = () => (
	<div className="row">
		<div className="col-2">
			<code>localization</code>
		</div>
		<div className="col">
			Localization object
			<br />
			<b>Type: </b> <code>CronLocalization</code>
		</div>
	</div>
);

export const TabsProp = () => (
	<div className="row">
		<div className="col-2">
			<code>tabs</code>
		</div>
		<div className="col">
			List of visible tabs.
			<br/>
			<b>Type: </b> 
			<HashLink smooth to="#tab">Tab</HashLink>[]
		</div>
	</div>
);

export const HideTabsProp = () => (
	<div className="row">
		<div className="col-2">
			<code>hideTabs</code>
		</div>
		<div className="col">
			Control tabs visibility.
			<br/>
			<b>Type: </b> <code>boolean</code>
		</div>
	</div>
);

export const ActiveTabProp = () => (
	<div className="row">
		<div className="col-2">
			<code>activeTab</code>
		</div>
		<div className="col">
			The active tab.
			<br/>
			<b>Type: </b> <HashLink smooth to="#tab">Tab</HashLink>
		</div>
	</div>
);

export const OnChangeProp = () => (
	<div className="row">
		<div className="col-2">
			<code>onChange</code>
		</div>
		<div className="col">
			The callback is triggered when the user changes the cron value using the UI.
			<br />
			Event payload is the string of the newly cron value.
			<br />
			<b>Type: </b> <code>(value: string) =&gt; void</code>
		</div>
	</div>
);

export const OnTabChangeProp = () => (
	<div className="row">
		<div className="col-2">
			<code>onTabChange</code>
		</div>
		<div className="col">
			The callback is triggered when active tab is changed.
			<br />
			Event payload is the string of the newly cron value.
			<br />
			<b>Type: </b> <code>(tab: <HashLink smooth to="#tab">Tab</HashLink>) =&gt; void</code>
		</div>
	</div>
);