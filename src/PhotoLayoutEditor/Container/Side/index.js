import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery/dist/jquery.slim';
import * as actions from '../../actions';
import ToggleSideButton from './ToggleSideButton';
import Navigation from './Navigation';
import Items from './Items';
import * as lib from '../../lib';
import selectItems from './selectItems';


class Side extends React.Component {

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
				target = $this.data('key');
				return false;
			}
		});

		return target;
	}

	/**
	 * On select items
	 *
	 * @param {Number} key
	 */
	_selectItem(key)
	{
		const { props } = this;
		let selected = selectItems(props, key);
		props.api.side.select(selected);
	}

	/**
	 * Remove items
	 */
	_removeItems()
	{
		const { props } = this;
		let keys = props.api.side.getKeys('selected');

		if (keys.length)
		{
			if (confirm('Do you really want to delete it?'))
			{
				props.api.side.remove(keys);
			}
		}
		else
		{
			if (!confirm('Delete all?')) return;
			keys = props.api.side.getKeys('all');
			props.api.side.remove(keys);
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
			let keys = this.props.api.side.getKeys('selected');
			let result = this.props.api.side.attachToGrid(keys);
			if (result) throw result;
		}
		catch(e)
		{
			alert(e.message);
		}
	}

	_dragStartItem(evt)
	{
		const { props } = this;

		// for firefox
		evt.dataTransfer.setData('text/plain', null);

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
			this.dragTarget = $(e.currentTarget).data('key');
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
		if (!lib.util.checkSupportCss('touch-action', 'pan-y'))
		{
			e.preventDefault();
		}

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
						onClick={() => props.api.util.toggleSide(undefined)}/>
					<Navigation
						onAttach={() => this._attach()}
						onToggleSelect={() => props.api.side.toggleSelectAll()}
						onUpload={(e) => this._upload(e)}
						onRemove={() => this._removeItems()}/>
					<Items
						files={props.tree.side.files}
						onSelect={(e) => this._selectItem(e)}
						onDragStart={(e) => this._dragStartItem(e)}
						onDragEnd={(e) => this._dragEndItem(e)}
						onTouchStart={(e) => this._touchStartItem(e)}
						onTouchMove={(e) => this._touchMoveItem(e)}
						onTouchEnd={(e) => this._touchEndItem(e)}
						progress={props.tree.side.progressPercent}/>
				</div>
			</aside>
		);
	}

}
Side.displayName = 'Side';
Side.defaultProps = {
	tree: {}, // data tree in reduce
	setting: {}, // setting in reduce
	api: {}, // api
	dispatch: null, // redux dispatch
};


export default connect((state) => Object.assign({}, state))(Side);
