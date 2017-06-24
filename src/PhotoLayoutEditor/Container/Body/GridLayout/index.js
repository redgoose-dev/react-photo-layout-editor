import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'react-grid-layout';
import classNames from 'classnames';

import Cropper from '../../Cropper';

import * as actions from '../../../actions';
import * as libs from '../../../lib';


let timeStamp = [];


class GridLayout extends React.Component {

	static displayName = 'GridLayout';

	static defaultProps = {
		tree: null,
		dispatch: null,
	};

	constructor(props)
	{
		super(props);
	}

	/**
	 * On select block
	 *
	 * @param {String} id
	 * @param {boolean} isImage
	 */
	_selectBlock(id=null, isImage=false)
	{
		const { props } = this;

		if (id === null)
		{
			props.dispatch(actions.body.activeBlock([], false));
			return;
		}

		switch(props.keyboard.keyName)
		{
			case 'CMD':
			case 'CTRL':
			case 'SHIFT':
				if (libs.object.isArray(props.tree.body.activeBlock))
				{
					let newActiveBlock = Object.assign([], props.tree.body.activeBlock);
					if (newActiveBlock.indexOf(id) > -1)
					{
						newActiveBlock.splice(newActiveBlock.indexOf(id), 1);
					}
					else
					{
						newActiveBlock.push(id);
					}
					props.dispatch(actions.body.activeBlock(newActiveBlock, isImage));
				}
				else
				{
					props.dispatch(actions.body.activeBlock([id], isImage));
				}
				break;

			default:
				props.dispatch(actions.body.activeBlock([id], isImage));
				break;
		}
	}

	/**
	 * On update blocks
	 *
	 * @param {String} type
	 * @param {Array} layout
	 * @param {HTMLElement} element
	 */
	_updateBlocks(type, layout=null, element=null)
	{
		const { props } = this;

		/**
		 * convert layout
		 *
		 * @return {Object}
		 */
		function convertLayout()
		{
			let result = {};
			for (let i=0; i<layout.length; i++)
			{
				result[layout[i].i.split('__')[1]] = layout[i];
			}
			return result;
		}

		switch(type)
		{
			case 'start':
				timeStamp[0] = new Date().getTime();
				break;

			case 'end':
				timeStamp[1] = new Date().getTime();
				if (timeStamp[1] - timeStamp[0] > 400)
				{
					let newLayout = convertLayout();
					let newGrid = {};
					Object.keys(props.tree.body.grid).forEach(k => {
						newGrid[k] = {
							...props.tree.body.grid[k],
							layout: {
								x: newLayout[k].x,
								y: newLayout[k].y,
								w: newLayout[k].w,
								h: newLayout[k].h,
							}
						};
					});
					props.dispatch(actions.body.updateBlocks(newGrid));
				}
				timeStamp = [];
				break;
		}
	}

	/**
	 * Render item
	 *
	 * @param {String} k
	 * @return {Component}
	 */
	renderItem(k)
	{
		const { props } = this;
		const { activeBlock, grid } = props.tree.body;
		const item = grid[k];

		let key = `${item.indexPrefix}__${k}`;
		let active = !!(activeBlock && activeBlock.length && activeBlock.indexOf(k) > -1);

		return (
			<div
				key={key}
				data-grid={item.layout}
				data-key={k}
				onClick={(event) => {
					event.stopPropagation();
					this._selectBlock(k, !!item.image);
				}}
				style={{ backgroundColor: item.color || props.setting.body.blockColor }}
				className={classNames({ 'ple-grid__item-active': active })}>
				{item.image && (
					<figure
						style={{
							backgroundImage: `url('${item.image.src}')`,
							backgroundPosition: item.image.position,
							backgroundSize: item.image.size,
						}}/>
				)}
			</div>
		);
	}

	render()
	{
		const { props } = this;
		const { setting } = props.tree.body;
		const bodyWidth = (setting.width * setting.column) +
			(setting.innerMargin * (setting.column-1)) +
			(setting.outerMargin * 2);

		return (
			<div className="ple-grid__wrap" onClick={() => this._selectBlock()}>
				<div className="ple-grid__body" style={{ width: `${bodyWidth}px` }}>
					<ReactGridLayout
						autoSize={true}
						cols={setting.column}
						rowHeight={setting.height}
						width={bodyWidth}
						margin={[setting.innerMargin, setting.innerMargin]}
						containerPadding={[setting.outerMargin, setting.outerMargin]}
						verticalCompact={!setting.freeMode}
						onDragStart={() => this._updateBlocks('start')}
						onDragStop={(layout, oldItem, newItem, placeholder, e, element) => this._updateBlocks('end', layout, element)}
						onResizeStart={() => this._updateBlocks('start')}
						onResizeStop={(layout, oldItem, newItem, placeholder, e, element) => this._updateBlocks('end', layout, element)}
						style={{
							width: `100%`,
							backgroundColor: setting.bgColor
						}}
						className="ple-grid">
						{Object.keys(props.tree.body.grid).map(this.renderItem.bind(this))}
					</ReactGridLayout>
					{props.tree.cropper.visible ? ( <Cropper/> ) : null}
				</div>
			</div>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(GridLayout);