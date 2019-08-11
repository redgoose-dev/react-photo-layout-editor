import React from 'react';
import classNames from 'classnames';
import * as lib from '../../../lib';


class Item extends React.Component {

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
				<span
					type="button"
					data-id={props.id}
					data-image={props.image}
					draggable={true}
					onClick={props.onClick}
					{...attr}
					style={{ backgroundImage: `url('${props.image}')` }}
					className={classNames({ 'ple-sideItems__item-active': props.active })}/>
			</li>
		);
	}
}
Item.displayName = 'Item';
Item.defaultProps = {
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


export default Item;
