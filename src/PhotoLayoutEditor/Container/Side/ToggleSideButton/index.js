import React, { Component } from 'react';
import classNames from 'classnames';


class ToggleSideButton extends Component {

	render() {
		const { props } = this;

		return (
			<button type="button" onClick={props.onClick} className="ple-side__toggle">
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
ToggleSideButton.displayName = 'ToggleSideButton';
ToggleSideButton.defaultProps = {
	show: false,
	onClick: function() {}
};


export default ToggleSideButton;