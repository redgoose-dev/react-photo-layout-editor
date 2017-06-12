import React, { Component } from 'react';
import classNames from 'classnames';


export default class ToggleSideButton extends Component {

	static displayName = 'ToggleSideButton';

	static defaultProps = {
		show: false,
		onClick: () => {}
	};

	render() {
		const { props } = this;

		return (
			<button
				type="button"
				onClick={props.onClick}
				className="toggle">
				<span>
					<i className={classNames(
						'ple-sp-ico',
						'ple-abs',
						{
							'ple-ico-arrow-right': props.show,
							'ple-ico-arrow-left': !props.show
						}
					)}>
						Toggle sidebar
					</i>
				</span>
			</button>
		);
	}

}