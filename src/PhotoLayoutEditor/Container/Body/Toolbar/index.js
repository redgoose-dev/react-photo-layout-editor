import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import $ from 'jquery/dist/jquery.slim';
import ColorPicker from 'react-simple-colorpicker';

import * as actions from '../../../actions';
import * as libs from '../../../lib';

import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';


class Toolbar extends React.Component {

	static displayName = 'Toolbar';

	static defaultProps = {
		dispatch: null,
		tree: null,
	};

	constructor(props)
	{
		super(props);

		this.state = {
			active: {
				setting: false,
				editBlockColor: false,
			},
			visible: {
				setting: true,
				shuffle: true,
				add: true,
				select: true,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: false
			}
		}
	}

	componentWillReceiveProps(nextProps)
	{
		const { state, props } = this;

		let newState = Object.assign({}, state);
		let updated = false;

		// select block
		if (props.tree.body.activeBlock.length !== nextProps.tree.body.activeBlock.length)
		{
			let active = !!(nextProps.tree.body.activeBlock.length);
			newState.visible = Object.assign({}, newState.visible, {
				removeImage: active,
				duplicate: active,
				removeBlock: active,
				editColor: active
			});
			updated = true;
		}

		// select image block
		if (nextProps.tree.body.activeBlock[0])
		{
			let block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
			newState.visible = Object.assign({}, newState.visible, {
				edit: !!(block && block.image)
			});
			updated = true;
		}

		if (updated)
		{
			this.setState(newState);
		}
	}

	changeActive(keyName, userSW, event)
	{
		const { state } = this;
		const sw = userSW || !state.active[keyName];
		const cTarget = event ? event.currentTarget : null;

		if (sw)
		{
			$(document).on('click.pleToolbar', (e) => {
				if ($(e.target).closest('.ple-toolbar__pop').length) return;
				if (!(e.target === cTarget) && !(e.target.parentNode === cTarget))
				{
					this.changeActive(keyName, false);
				}
			});
		}
		else
		{
			$(document).off('click.pleToolbar');
		}

		this.setState({
			active: {
				...state.active,
				setting: false,
				editColor: false,
				[keyName] : sw,
			}
		});
	}

	deactivate()
	{
		$(document).off('click.pleToolbar');
		return new Promise((reject) => {
			this.setState({
				active: {
					setting: false,
					editColor: false,
				}
			}, reject);
		});
	}

	submitEditSetting(state)
	{
		this.props.dispatch(actions.body.updateSetting(state));
		this.changeActive('setting', false);
		return false;
	}

	_onClickEdit()
	{
		const { props } = this;
		props.api.cropper.open(props.tree.body.activeBlock[0]);
	}

	render()
	{
		const { state, props } = this;
		let activeBlockColor = '#fff';

		if (typeof props.tree.body.grid === 'object' && libs.object.isArray(props.tree.body.activeBlock))
		{
			const n = props.tree.body.activeBlock[0];
			activeBlockColor = (props.tree.body.grid[n] && props.tree.body.grid[n].color) ?
				props.tree.body.grid[n].color :
				props.setting.body.blockColor;
		}

		return (
			<nav className="ple-toolbar">
				<div className="ple-toolbar__wrap">
					{state.visible.setting && (
						<Button
							iconClass="ple-ico-setting"
							className={classNames('ple-edit-setting', {
								'ple-toolbar__block-active': state.active.setting
							})}
							onClick={(e) => {
								e.persist();
								if (!state.active.setting)
								{
									this.deactivate().then(() => {
										this.changeActive('setting', null, e);
									});
								}
							}}
							title="Edit preference">
							<EditLayoutSetting
								submit={this.submitEditSetting.bind(this)}
								setting={props.tree.body.setting}
								defaultSetting={props.setting.body.setting}/>
						</Button>
					)}
					{state.visible.shuffle && (
						<Button
							iconClass="ple-ico-arrow-random"
							onClick={() => props.api.grid.shuffle()}
							title="Shuffle block"/>
					)}
					{state.visible.add && (
						<Button
							iconClass="ple-ico-plus"
							onClick={() => props.api.grid.add()}
							title="Add block"/>
					)}
					{state.visible.select && (
						<Button
							iconClass="ple-ico-select"
							onClick={() => {
								if (libs.object.isArray(props.tree.body.activeBlock))
								{
									props.dispatch(actions.body.activeBlock(null));
									return;
								}
								let newActiveBlock = [];
								let isImage = !!(props.tree.body.grid[0] && props.tree.body.grid[0].image);
								Object.keys(props.tree.body.grid).forEach((k) => newActiveBlock.push(k));
								props.dispatch(actions.body.activeBlock(newActiveBlock, isImage));
							}}
							title="Toggle select block"/>
					)}

					{state.visible.edit && (
						<Button
							iconClass="ple-ico-pencil"
							className="ple-toolbar__block-key"
							onClick={this._onClickEdit.bind(this)}
							title="Edit block"/>
					)}
					{state.visible.removeImage && (
						<Button
							iconClass="ple-ico-empty"
							className="ple-toolbar__block-key"
							onClick={() => {
								console.log('act remove image');
								//props.dispatch(actions.body.removeImages(props.tree.body.activeBlock));
							}}
							title="Remove image in block"/>
					)}
					{state.visible.duplicate && (
						<Button
							iconClass="ple-ico-duplicate"
							className="ple-toolbar__block-key"
							onClick={() => {
								if (props.tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
							}}
							title="Duplicate block"/>
					)}
					{state.visible.removeBlock && (
						<Button
							iconClass="ple-ico-trash"
							className="ple-toolbar__block-key"
							onClick={() => {
								if (props.tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								props.api.grid.remove(props.tree.body.activeBlock);
							}}
							title="Remove block"/>
					)}
					{state.visible.editColor && (
						<Button
							iconClass="ple-ico-palette"
							className={classNames(
								'ple-edit-color',
								'ple-toolbar__block-key',
								{ 'ple-toolbar__block-active': state.active.editColor }
							)}
							onClick={(e) => {
								e.persist();
								if (!state.active.editColor)
								{
									this.deactivate().then(() => this.changeActive('editColor', null, e));
								}
							}}
							title="Change color">
							<div className="ple-colorPicker__wrap">
								<ColorPicker
									onChange={(color) => {
										if (!color) return;
										props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));
									}}
									color={activeBlockColor}
									className="ple-colorPicker__body"/>
							</div>
						</Button>
					)}
				</div>
			</nav>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(Toolbar);