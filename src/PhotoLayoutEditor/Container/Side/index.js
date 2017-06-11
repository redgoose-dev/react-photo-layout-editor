import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery/dist/jquery.slim';

import * as actions from '../../actions';

import ToggleSideButton from './ToggleSideButton';
import Navigation from './Navigation';
import Items from './Items';


let firstSelectIdx = null;


class Side extends React.Component {

	static displayName = 'Side';

	static defaultProps = {
		tree: {}, // data tree in reduce
		setting: {}, // setting in reduce
		api: {}, // api
		dispatch: null, // redux dispatch
	};

	constructor(props)
	{
		super(props);

		this.dragTarget = null;
		this.dragPosition = [];
		this.$gridItems = null;
		this.$dragItem = null;
		this.uploading = false;
	}

	/**
	 * get gridster item
	 * 포인트 위치에 있는 gridster블럭을 가져온다.
	 *
	 * @return {Object} gridster item
	 */
	getGridsterItem()
	{
		const { props } = this;
		let target = null;
		this.$gridItems = $(props.element).find('.ple-grid > div');

		this.$gridItems.each((n, el) => {
			const $this = $(el);
			const pos = $this.offset();
			if (pos.left < this.dragPosition[0] &&
				(pos.left + $this.width()) > this.dragPosition[0] &&
				pos.top < this.dragPosition[1] &&
				(pos.top + $this.height()) > this.dragPosition[1])
			{
				target = $this.data('index');
				return false;
			}
		});

		return target;
	}

	/**
	 * On select item
	 *
	 * @param {Object} id
	 */
	_selectItem(id)
	{
		const { props } = this;
		const { keyName } = props.keyboard;
		let type = null;

		if (keyName !== 'SHIFT')
		{
			let currentItem = null;
			props.tree.side.files.forEach((o, k) => {
				if (o.id === id)
				{
					currentItem = o;
					return false;
				}
			});
			firstSelectIdx = (currentItem.active === true) ? null : id;
			if (!firstSelectIdx && currentItem.active === true)
			{
				firstSelectIdx = currentItem.id;
			}
		}

		switch (keyName) {
			case 'CTRL':
			case 'CMD':
				type = 'add';
				break;
			case 'SHIFT':
				type = 'range';
		}

		props.dispatch(actions.side.changeActiveFile(firstSelectIdx, id, type));
	}

	/**
	 * Remove items
	 */
	_removeItems()
	{
		const { props } = this;
		let activeItems = [];

		if (!props.tree.side.files.length) return;

		props.tree.side.files.forEach(o => {
			if (o.active) activeItems.push(o.id);
		});

		if (!activeItems.length)
		{
			if (confirm('Delete all?'))
			{
				props.tree.side.files.forEach(o => {
					activeItems.push(o.id);
				});
			}
		}

		props.dispatch(actions.side.removeFiles(activeItems));
	}

	/**
	 * toggle select all items
	 */
	_toggleSelect()
	{
		const { props } = this;
		let type = 'all';

		props.tree.side.files.some((o) => {
			if (o.active) type = 'none';
			return o.active;
		});

		props.dispatch(actions.side.changeActiveFile(null, null, type));
	}

	/**
	 * upload
	 *
	 * @param {FileList} files
	 */
	_upload(files)
	{
		const { props } = this;
		props.api.side.upload(files);
	}

	/**
	 * Attach images to grid
	 */
	_attach()
	{
		const { props } = this;
		let selectedImages = [];

		props.tree.side.files.forEach((o, k) => {
			if (o.active)
			{
				selectedImages.push(o.image);
			}
		});

		if (!selectedImages.length)
		{
			alert('not select image');
			return;
		}

		props.dispatch(actions.body.attachImages(
			selectedImages,
			props.tree.body.setting.column,
			props.tree.body.activeBlock
		));
	}

	_dragStartItem(e)
	{
		const { props } = this;

		this.$gridItems = $(props.element).find('.ple-grid > div');
		this.$gridItems.on('dragover', (e) => {
			e.preventDefault();
			if ($(e.currentTarget).hasClass('hover')) return;
			$(e.currentTarget).addClass('hover');
		}).on('dragleave', (e) => {
			e.preventDefault();
			$(e.currentTarget).removeClass('hover');
		}).on('drop', (e) => {
			e.preventDefault();
			$(e.currentTarget).removeClass('hover');
			this.dragTarget = $(e.currentTarget).data('index');
		});
	}
	_dragEndItem(e)
	{
		const { props } = this;

		this.$gridItems.off();
		this.$gridItems = null;

		// check drag target
		if (this.dragTarget === null) return;

		// play redux
		props.dispatch(actions.body.attachImage(
			this.dragTarget,
			$(e.currentTarget).data('image')
		));

		// empty dragTarget
		this.dragTarget = null;
	}
	_touchStartItem(e)
	{
		this.$dragItem = $(e.currentTarget)
			.clone()
			.removeAttr('draggable')
			.addClass('ple-side__placeholder')
			.width($(e.currentTarget).width())
			.height($(e.currentTarget).height());

		$('body').append(this.$dragItem);
	}
	_touchMoveItem(e)
	{
		let touch = e.nativeEvent.touches[0];
		this.dragPosition = [touch.pageX, touch.pageY];
		this.$dragItem.css({
			left: touch.pageX - (this.$dragItem.width() * 0.5),
			top: touch.pageY - (this.$dragItem.height() * 0.5)
		});
	}
	_touchEndItem(e)
	{
		const { props } = this;

		this.$dragItem.remove();
		this.$dragItem = null;

		if (this.dragPosition.length > 0)
		{
			this.dragTarget = this.getGridsterItem();

			// check drag target
			if (this.dragTarget === null) return;

			// play redux
			props.dispatch(actions.body.attachImage(
				this.dragTarget,
				$(e.currentTarget).data('image')
			));
			this.dragPosition = [];
		}
		else
		{
			this._selectItem($(e.currentTarget).data('id'));
		}
	}

	render()
	{
		const { props } = this;

		return (
			<aside className="ple-side">
				<div className={classNames(
					'wrap',
					{ 'show': props.tree.side.visible }
				)}>
					<span
						onClick={() => props.dispatch(actions.side.changeActiveFile(null, null, 'none'))}
						className="background"/>
					<ToggleSideButton
						show={props.tree.side.visible}
						onClick={() => props.api.layout.toggleSide(undefined)}/>
					<Navigation
						onAttach={this._attach.bind(this)}
						onToggleSelect={this._toggleSelect.bind(this)}
						onUpload={this._upload.bind(this)}
						onRemove={this._removeItems.bind(this)}/>
					<Items
						files={props.tree.side.files}
						onSelect={this._selectItem.bind(this)}
						onDragStart={this._dragStartItem.bind(this)}
						onDragEnd={this._dragEndItem.bind(this)}
						onTouchStart={this._touchStartItem.bind(this)}
						onTouchMove={this._touchMoveItem.bind(this)}
						onTouchEnd={this._touchEndItem.bind(this)}
						progress={props.tree.side.progressPercent}/>
				</div>
			</aside>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(Side);