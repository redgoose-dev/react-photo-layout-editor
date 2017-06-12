import React from 'react';
import classNames from 'classnames';


export default class Button extends React.Component {

	static displayName = 'Button';

	render() {
		const { props } = this;

		return (
			<div className={classNames('block', props.className)}>
				<button type="button" title={props.title} onClick={props.onClick}>
					<i className={classNames('ple-sp-ico', 'ple-abs', props.iconClass)}>{props.title}</i>
				</button>
				{props.children && <div className="pop">{props.children}</div>}
			</div>
		);
	}
}