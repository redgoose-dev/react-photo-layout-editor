import React from 'react';

import Item from './Item';


export default class Items extends React.Component {

	static displayName = 'Items';

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
			<div className="ple-sideItems">
				<div className="ple-sideItems__wrap">
					<ul>
						{Object.keys(props.files).map((o) => {
							return (
								<Item
									key={o}
									id={`sideItem_${o}`}
									image={props.files[o].image}
									onDragStart={props.onDragStart}
									onDragEnd={props.onDragEnd}
									onTouchStart={props.onTouchStart}
									onTouchMove={props.onTouchMove}
									onTouchEnd={props.onTouchEnd}
									onClick={() => props.onSelect(`sideItem_${o}`)}
									active={props.files[o].active}/>
							);
						})}
						{props.progress !== null && (
							<li className="ple-sideItems__loading">
								<div className="ple-sideItems__progress">
									<span
										className="ple-sideItems__bar"
										style={{ height: `${props.progress}%` }}/>
									<span className="ple-sideItems__percent">{`${props.progress}%`}</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}

}