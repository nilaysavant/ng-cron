import React from 'react';

import { Mode } from '@sbzen/cron-core';

export type TabBaseProps = {
	cssClassPrefix: string,
	disabled: boolean,
	onChange: () => void,
	session: number
};

export abstract class TabBaseComponent<P extends TabBaseProps, S> extends React.Component<P, S> {
	private sessionId = Date.now().toString();

	protected genId(mode: Mode, extra?: string) {
		return `${mode}-${extra}${this.sessionId}`;
	}

	protected genClassName(classes: string[], noPrefixClasses: string[] = []) {
		const prefixed = classes.map(c => this.props.cssClassPrefix + c);
		return prefixed.concat(noPrefixClasses).join(' ');
	}

	protected applyChanges() {
		this.props.onChange();
	}
}
