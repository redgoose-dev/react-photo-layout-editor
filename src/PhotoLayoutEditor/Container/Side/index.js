import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery/dist/jquery.slim';

import * as actions from '../../actions';

import ToggleSideButton from './ToggleSideButton';
import Navigation from './Navigation';
import Items from './Items';

import selectItems from './selectItems';


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
	 * On select items
	 *
	 * @param {Number} id
	 */
	_selectItem(id)
	{
		const { props } = this;
		let selected = selectItems(props, id);
		props.api.side.select(selected);
	}

	/**
	 * Remove items
	 */
	_removeItems()
	{
		const { props } = this;
		let ids = props.api.side.getKeys('selected');

		if (!ids.length)
		{
			if (!confirm('Delete all?')) return;
			ids = props.api.side.getKeys('all');
		}

		if (confirm('Do you really want to delete it?'))
		{
			props.api.side.remove(ids);
		}
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
		try
		{
			let ids = this.props.api.side.getKeys('selected');
			let result = this.props.api.side.attachToGrid(ids);
			if (result) throw result;
		}
		catch(e)
		{
			alert(e.message);
		}
	}

	_dragStartItem(e)
	{
		const { props } = this;

		this.$gridItems = $(props.element).find('.ple-grid > div');
		this.$gridItems.on('dragover', (e) => {
			e.preventDefault();
			if ($(e.currentTarget).hasClass('ple-grid__item-hover')) return;
			$(e.currentTarget).addClass('ple-grid__item-hover');
		}).on('dragleave', (e) => {
			e.preventDefault();
			$(e.currentTarget).removeClass('ple-grid__item-hover');
		}).on('drop', (e) => {
			e.preventDefault();
			$(e.currentTarget).removeClass('ple-grid__item-hover');
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
			//this._selectItem($(e.currentTarget).data('id'));
		}
	}

	render()
	{
		const { props } = this;

		return (
			<aside className="ple-side">
				<div className={classNames(
					'ple-side__wrap',
					{ 'ple-side__wrap-show': props.tree.side.visible }
				)}>
					<span
						onClick={() => props.api.side.toggleSelectAll(false)}
						className="ple-side__background"/>
					<ToggleSideButton
						show={props.tree.side.visible}
						onClick={() => props.api.layout.toggleSide(undefined)}/>
					<Navigation
						onAttach={this._attach.bind(this)}
						onToggleSelect={() => props.api.side.toggleSelectAll()}
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