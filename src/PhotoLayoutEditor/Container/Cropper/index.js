import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery/dist/jquery.slim';
import classNames from 'classnames';

import Block from './Block';
import * as actions from '../../actions';
import * as lib from '../../lib';


class Cropper extends React.Component {

	constructor(props)
	{
		super(props);
		const { cropper } = props.tree;

		this.imageMeta = null;
		this._block = null;
		this.$item = $(props.element)
			.find('.react-grid-item')
			.filter(`[data-index=${props.tree.cropper.item.index}]`);

		this.state = {
			pending: true,
			position: cropper.item.image.position,
			size: cropper.item.image.size || 'cover',
			width: this.$item.width(),
			height: this.$item.height(),
			top: this.$item.offset().top,
			left: this.$item.offset().left
		};
	}

	componentDidMount()
	{
		const { props } = this;
		const { cropper } = props.tree;

		lib.util.getImageSize(cropper.item.image.src).then((res) => {
			this.imageMeta = res;
			this.setState({ pending: false });
		});
	}

	/**
	 * on close cropper
	 * cropper를 닫고, 변경된 이미지를 grid로 보낸다.
	 *
	 */
	_onClose()
	{
		const { props } = this;
		props.dispatch(actions.cropper.close({
			index: props.tree.cropper.item.index,
			position: this._block.state.position,
			size: this._block.state.size
		}));
	}

	/**
	 * toggle image type
	 * 직접 리사이즈를 사용하는지 기본(꽉채우는..)타입으로 사용할건지 변경하는 액션
	 *
	 */
	_toggleImageType()
	{
		const { state, props } = this;

		if (state.size === 'cover')
		{
			let targetSize = '';
			let ratio = 0;
			if (state.height > state.width)
			{
				ratio = lib.number.getRatioForResize(state.height, this.imageMeta.height);
				targetSize = `${parseInt(this.imageMeta.width * ratio)}px ${state.height}px`;
			}
			else
			{
				ratio = lib.number.getRatioForResize(state.width, this.imageMeta.width);
				targetSize = `${state.width}px ${parseInt(this.imageMeta.height * ratio)}px`;
			}
			this.setState({
				position: '0 0',
				size: targetSize,
			});
		}
		else
		{
			this.setState({
				position: `50% 50%`,
				size: 'cover',
			});
		}
	}

	render()
	{
		const { state, props } = this;

		if (state.pending) return null;

		return (
			<div className="ple-cropper">
				<span className="ple-cropper__bg"/>
				<div
					style={{
						width: `${state.width}px`,
						height: `${state.height}px`,
						top: `${state.top}px`,
						left: `${state.left}px`,
					}}
					className="ple-cropper__wrap">
					<Block
						ref={(r) => { this._block = r; }}
						src={props.tree.cropper.item.image.src}
						position={state.position}
						size={state.size}
						bgColor={props.tree.cropper.item.color || props.setting.body.blockColor}/>
					<nav className="ple-cropper__nav">
						<button type="button" onClick={this._onClose.bind(this)}>
							<i className="sp-ico ico-close abs">Close cropper</i>
						</button>
						<button
							type="button"
							onClick={this._toggleImageType.bind(this)}
							className={classNames({
								'active': state.size !== 'cover'
							})}>
							<i className="sp-ico ico-resize abs">Toggle background size type</i>
						</button>
					</nav>
				</div>
			</div>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(Cropper);