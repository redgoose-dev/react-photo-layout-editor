import React from 'react';
import classNames from 'classnames';

import * as lib from '../../../lib';


export default class Item extends React.Component {

	static defaultProps = {
		image: null, // image
		id: null, // id
		active: null, // active item
		onClick: null, // on click item
		onDragStart: null, // on drag start
		onDragEnd: null, // on drag end
		onTouchStart: null, // on touch start
		onTouchMove: null, // on touch move
		onTouchEnd: null, // on touch end
	};

	render() {
		const { props } = this;

		let attr = Object.assign({},
			lib.util.isTouchDevice() ? {
				onTouchStart: props.onTouchStart,
				onTouchMove: props.onTouchMove,
				onTouchEnd: props.onTouchEnd
			} : {
				onDragStart: props.onDragStart,
				onDragEnd: props.onDragEnd
			});

		return (
			<li>
				<button
					type="button"
					data-id={props.id}
					data-image={props.image}
					draggable={true}
					onClick={props.onClick}
					{...attr}
					style={{ backgroundImage: `url('${props.image}')` }}
					className={classNames({ 'active': props.active })}/>
			</li>
		);
	}
}