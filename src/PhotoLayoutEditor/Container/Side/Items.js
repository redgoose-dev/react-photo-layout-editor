import React from 'react';

import Item from './Item';


export default class Items extends React.Component {

	static defaultProps = {
		files: [], // files
		onSelect: (id) => {}, // on select event
		onDragStart: null, // on drag start
		onDragEnd: null, // on drag end
		onTouchStart: null, // on touch start
		onTouchMove: null, // on touch move
		onTouchEnd: null, // on touch end
		progress: null, // on progress number
	};

	render() {
		const { props } = this;

		return (
			<div className="items">
				<div className="wrap">
					<ul>
						{props.files.map((o, k) => {
							return (
								<Item
									key={k}
									id={o.id}
									image={o.image}
									onDragStart={props.onDragStart}
									onDragEnd={props.onDragEnd}
									onTouchStart={props.onTouchStart}
									onTouchMove={props.onTouchMove}
									onTouchEnd={props.onTouchEnd}
									onClick={() => props.onSelect(o.id)}
									active={o.active}/>
							);
						})}
						{props.progress !== null && (
							<li className="loading">
								<div className="progress">
									<span
										className="bar"
										style={{ height: `${props.progress}%` }}/>
									<span className="percent">{`${props.progress}%`}</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}

}