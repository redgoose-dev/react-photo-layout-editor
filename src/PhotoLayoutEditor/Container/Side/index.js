import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery/dist/jquery.slim';

import * as actionsSide from '../../actions/side';
import * as actionsBody from '../../actions/body';
import * as lib from '../../lib';
import API from '../../API';

import ToggleSideButton from './ToggleSideButton';
import Navigation from './Navigation';
import Items from './Items';


let firstSelectIdx = null;


class Side extends React.Component {

	static defaultProps = {
		tree: {}, // reduce data
		ple: null, // root object
		dispatch: null, // redux dispatch
	};

	constructor(props)
	{
		super(props);

		this.state = {
			uploading: false,
			itemProgress: null,
		};

		this.dragType = null;
		this.dragTarget = null;
		this.dragPosition = [];
		this.$gridItems = null;
		this.$dragItem = null;
	}

	componentDidMount()
	{
		const { props } = this;
		//this.getItems(props.ple.preference.side.items);
	}

	/**
	 * Get items
	 *
	 * @param {Array|String} items
	 */
	getItems(items)
	{
		const { dispatch } = this.props;

		if (typeof items === 'string')
		{
			console.log('TODO')
			// axios.get(items)
			// 	.then( (res) => dispatch(actionsSide.addFiles(res.data)) )
			// 	.catch( (error) => console.log('ERROR', error) );
		}
		else if (items instanceof Array)
		{
			dispatch(actionsSide.addFiles(items));
		}
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
		this.$gridItems = $(props.ple.el).find('.ple-grid > div');

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
		return;
		const { dispatch, ple, tree } = this.props;
		const { keyName } = ple.keyboard;

		if (keyName !== 'shift')
		{
			let currentItem = null;
			tree.side.files.forEach((o) => {
				if (o.id === id)
				{
					currentItem = o;
					return false;
				}
			});
			firstSelectIdx = (currentItem.active === true) ? null : id;
		}

		dispatch(actionsSide.changeActiveFile(id, keyName, firstSelectIdx));
	}

	/**
	 * Remove items
	 */
	_removeItems()
	{
		const { tree, dispatch } = this.props;
		let activeItems = [];

		if (!tree.side.files.length) return;

		tree.side.files.forEach(o => {
			if (o.active) activeItems.push(o.id);
		});

		if (!activeItems.length)
		{
			if (confirm('모두 지울까요?'))
			{
				tree.side.files.forEach(o => {
					activeItems.push(o.id);
				});
			}
		}

		dispatch(actionsSide.removeFiles(activeItems));
	}

	/**
	 * toggle select all items
	 */
	_toggleSelect()
	{
		const { tree, dispatch } = this.props;
		let active = false;

		tree.side.files.some((o) => {
			if (o.active) active = true;
			return o.active;
		});

		if (active)
		{
			dispatch(actionsSide.changeActiveFile(null, 'none', null));
		}
		else
		{
			dispatch(actionsSide.changeActiveFile(null, 'all', null));
		}
	}

	/**
	 * upload
	 *
	 * @param {Array} files
	 */
	_upload(files)
	{
		if (this.state.uploading) return;

		const { ple, dispatch } = this.props;

		this.setState({ uploading: true }, () => {
			// lib.uploader.multiple(files, ple.preference.side.upload)
			// 	.done(() => {
			// 		console.warn('upload complete');
			// 		this.uploading = false;
			// 		this.setState({ uploading: false });
			// 	})
			// 	.progress((state, res) => {
			// 		switch(state)
			// 		{
			// 			case 'start':
			// 				this.setState({ itemProgress: 0 });
			// 				break;
			// 			case 'progress':
			// 				const percent = parseInt((res.loaded / res.total * 100));
			// 				this.setState({ itemProgress: percent });
			// 				break;
			// 			case 'done':
			// 				this.setState({ itemProgress: null });
			// 				if (res.src) dispatch(actionsSide.addFiles([res.src]));
			// 				break;
			// 		}
			// 	})
			// 	.fail(() => {
			// 		console.warn('upload fail');
			// 		this.setState({ uploading: false });
			// 	});
		});
	}

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

		props.dispatch(actionsBody.attachImages(
			selectedImages,
			props.tree.body.setting.column,
			props.tree.body.activeBlock
		));
	}

	_dragStartItem(e)
	{
		const { props } = this;

		this.$gridItems = $(props.ple.el).find('.ple-grid > div');
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
		props.dispatch(actionsBody.attachImage(
			this.dragTarget,
			$(e.currentTarget).data('image')
		));

		// empty dragTarget
		this.dragTarget = null;
	}
	_touchStartItem(e)
	{
		e.preventDefault();

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
		e.preventDefault();
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
			props.dispatch(actionsBody.attachImage(
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
		const { state, props } = this;
		const { ple, tree, dispatch } = props;

		return (
			<aside className="ple-side">
				<div className={classNames(
					'wrap',
					{ 'show': tree.side.layout.visible }
				)}>
					<span
						onClick={() => dispatch(actionsSide.changeActiveFile(null, 'none', null))}
						className="background"/>
					<ToggleSideButton
						show={tree.side.layout.visible}
						onClick={() => {
							//console.log('toggle side', API.getStore().getState());
							API.side.toggleVisible();
						}}/>
					<Navigation
						onAttach={this._attach.bind(this)}
						onToggleSelect={this._toggleSelect.bind(this)}
						onUpload={this._upload.bind(this)}
						onRemove={this._removeItems.bind(this)}/>
					<Items
						files={tree.side.files}
						onSelect={this._selectItem.bind(this)}
						onDragStart={this._dragStartItem.bind(this)}
						onDragEnd={this._dragEndItem.bind(this)}
						onTouchStart={this._touchStartItem.bind(this)}
						onTouchMove={this._touchMoveItem.bind(this)}
						onTouchEnd={this._touchEndItem.bind(this)}
						progress={state.itemProgress}/>
				</div>
			</aside>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);