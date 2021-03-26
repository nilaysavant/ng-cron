import React from 'react';

export type CronBaseProps = {
	cssClassPrefix?: string;
}

export abstract class CronBaseComponent<P extends CronBaseProps, S> extends React.Component<P, S> {
	constructor(
		props: P,
		protected session: number
	) {
		super(props);
	}

	protected getCssClassPrefix() {
		return this.props.cssClassPrefix || '';
	}

	protected genClassName(classes: string[], noPrefixClasses: string[] = []) {
		const prefixed = classes.map(c => this.getCssClassPrefix() + c);
		return prefixed.concat(noPrefixClasses).join(' ');
	}
}