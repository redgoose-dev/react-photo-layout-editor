import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import $ from 'jquery/dist/jquery.slim';
import ColorPicker from 'react-simple-colorpicker';

import { findObjectValueInArray } from '../../../lib/object';
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
			}
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
		const visible = props.tree.body.visibleToolbarButtons;
		let activeBlockColor = '#fff';

		if (libs.object.isArray(props.tree.body.grid))
		{
			if (libs.object.isArray(props.tree.body.activeBlock))
			{
				const n = findObjectValueInArray(props.tree.body.grid, 'index', props.tree.body.activeBlock[0]);
				activeBlockColor = (props.tree.body.grid[n] && props.tree.body.grid[n].color) ?
					props.tree.body.grid[n].color :
					props.setting.body.blockColor;
			}
		}

		return (
			<nav className="ple-toolbar">
				<div className="ple-toolbar__wrap">
					{visible.setting && (
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
					{visible.shuffle && (
						<Button
							iconClass="ple-ico-arrow-random"
							onClick={() => props.dispatch(actions.body.shuffleBlocks({
								x: props.tree.body.setting.column,
								y: 2,
								w: 2,
								h: 2
							}))}
							title="Shuffle block"/>
					)}
					{visible.add && (
						<Button
							iconClass="ple-ico-plus"
							onClick={() => props.dispatch(actions.body.addBlock({
								layout: {
									//x: randomRange(0, tree.body.setting.column-1),
									x: props.tree.body.grid.length % props.tree.body.setting.column,
									y: Infinity,
									w: 1,
									h: 1
								},
							}))}
							title="Add block"/>
					)}
					{visible.select && (
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
								props.tree.body.grid.forEach((o) => newActiveBlock.push(o.index));
								props.dispatch(actions.body.activeBlock(newActiveBlock, isImage));
							}}
							title="Toggle select block"/>
					)}

					{visible.edit && (
						<Button
							iconClass="ple-ico-pencil"
							className="ple-toolbar__block-key"
							onClick={this._onClickEdit.bind(this)}
							title="Edit block"/>
					)}
					{visible.removeImage && (
						<Button
							iconClass="ple-ico-empty"
							className="ple-toolbar__block-key"
							onClick={() => props.dispatch(actions.body.removeImages(props.tree.body.activeBlock))}
							title="Remove image in block"/>
					)}
					{visible.duplicate && (
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
					{visible.removeBlock && (
						<Button
							iconClass="ple-ico-trash"
							className="ple-toolbar__block-key"
							onClick={() => {
								if (props.tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								props.dispatch(actions.body.removeBlock(props.tree.body.activeBlock));
							}}
							title="Remove block"/>
					)}
					{visible.editColor && (
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