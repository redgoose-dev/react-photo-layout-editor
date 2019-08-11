import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery/dist/jquery.slim';
import classNames from 'classnames';
import { util } from '../../lib';


const controlEvent = {
	start: (util.isTouchDevice()) ? 'touchstart' : 'mousedown',
	move: (util.isTouchDevice()) ? 'touchmove' : 'mousemove',
	end: (util.isTouchDevice()) ? 'touchend' : 'mouseup',
};


class Block extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {
			position: props.position,
			size: props.size,
			isCover: props.size === 'cover',
		};

		this._self = null;
		this.$self = null;
		this.$img = null;
		this.moveStartInfo = {};
		this.resizeStartInfo = {};
	}

	componentDidMount()
	{
		// set dom
		this.$self = $(ReactDom.findDOMNode(this._self));
	}

	static getDerivedStateFromProps(nextProps, prevState)
	{
		if (prevState.size !== nextProps.size)
		{
			return {
				position: nextProps.position,
				size: nextProps.size,
				isCover: nextProps.size === 'cover',
			};
		}
		return null;
	}

	_moveStart(e)
	{
		e.stopPropagation();

		const { state } = this;

		// set image element
		this.$img = this.$self.find('img');

		this.moveStartInfo = {
			containerX: parseInt(state.position.split(' ')[0]),
			containerY: parseInt(state.position.split(' ')[1]),
			mouseX : (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + $(window).scrollLeft(),
			mouseY : (e.clientY || e.pageY || e.nativeEvent.touches[0].clientY) + $(window).scrollTop(),
		};

		$(document)
			.on(`${controlEvent.move}.move`, (e) => this._moveIng(e))
			.on(`${controlEvent.end}.move`, (e) => this._moveEnd(e));
	}
	_moveIng(e)
	{
		e.stopPropagation();

		const evt = (e.type === 'touchmove') ? e.originalEvent.touches[0] : e;
		let mouse = {};
		let distance = {};

		mouse.x = (evt.clientX || evt.pageX) + $(window).scrollLeft();
		mouse.y = (evt.clientY || evt.pageY) + $(window).scrollTop();

		distance.x = this.moveStartInfo.containerX + (mouse.x - this.moveStartInfo.mouseX);
		distance.y = this.moveStartInfo.containerY + (mouse.y - this.moveStartInfo.mouseY);

		this.setState({
			position: `${parseInt(distance.x)}px ${parseInt(distance.y)}px`
		});
	}
	_moveEnd(e)
	{
		e.preventDefault();

		this.$img = null;
		this.moveStartInfo = null;

		$(document)
			.off(`${controlEvent.move}.move`)
			.off(`${controlEvent.end}.move`);
	}

	_resizeStart(e)
	{
		e.stopPropagation();

		const { state } = this;

		this.$img = this.$self.find('img');
		this.resizeStartInfo = {
			title: e.currentTarget.title,
			width: this.$img.width(),
			height: this.$img.height(),
			mouseX : (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + $(window).scrollLeft(),
			posX: parseInt(state.position.split(' ')[0]),
			posY: parseInt(state.position.split(' ')[1]),
		};

		$(document)
			.on(`${controlEvent.move}.resize`, (e) => this._resizeIng(e))
			.on(`${controlEvent.end}.resize`, (e) => this._resizeEnd(e));
	}
	_resizeIng(e)
	{
		e.stopPropagation();

		let size = {};
		let position = {};
		let ratio = 1;
		let distanceHeight = 0;
		let evt = (e.type === 'touchmove') ? e.originalEvent.touches[0] : e;

		// set mouse position
		let distanceX = (evt.clientX || evt.pageX) + $(window).scrollLeft() - this.resizeStartInfo.mouseX;

		// set position and size
		switch(this.resizeStartInfo.title) {
			case 'resize-lt':
				position.x = this.resizeStartInfo.posX + distanceX;
				size.width = this.resizeStartInfo.width - distanceX;
				ratio = size.width / this.$img.get(0).naturalWidth;
				size.height = parseInt(this.$img.get(0).naturalHeight) * ratio;
				distanceHeight = this.resizeStartInfo.height - size.height;
				position.y = this.resizeStartInfo.posY + distanceHeight;
				break;
			case 'resize-rt':
				position.x = this.resizeStartInfo.posX;
				size.width = this.resizeStartInfo.width + distanceX;
				ratio = size.width / this.$img.get(0).naturalWidth;
				size.height = parseInt(this.$img.get(0).naturalHeight) * ratio;
				distanceHeight = this.resizeStartInfo.height - size.height;
				position.y = this.resizeStartInfo.posY + distanceHeight;
				break;
			case 'resize-lb':
				position.x = this.resizeStartInfo.posX + distanceX;
				position.y = this.resizeStartInfo.posY;
				size.width = this.resizeStartInfo.width - distanceX;
				ratio = size.width / this.$img.get(0).naturalWidth;
				size.height = parseInt(this.$img.get(0).naturalHeight) * ratio;
				break;
			case 'resize-rb':
				position.x = this.resizeStartInfo.posX;
				position.y = this.resizeStartInfo.posY;
				size.width = this.resizeStartInfo.width + distanceX;
				ratio = size.width / this.$img.get(0).naturalWidth;
				size.height = parseInt(this.$img.get(0).naturalHeight) * ratio;
				break;
			default:
				return;
		}

		// set image size

		this.setState({
			size: `${parseInt(size.width)}px ${parseInt(size.height)}px`,
			position: `${parseInt(position.x)}px ${parseInt(position.y)}px`
		});
	}
	_resizeEnd(e)
	{
		this.$img = null;
		this.resizeStartInfo = null;

		$(document)
			.off(`${controlEvent.move}.resize`)
			.off(`${controlEvent.end}.resize`);
	}

	render()
	{
		const { state, props } = this;
		const size = (state.size !== 'cover') ? state.size.split(' ') : state.size;
		const position = state.position.split(' ');

		return (
			<figure
				ref={r => { this._self = r; }}
				style={{ backgroundColor: props.bgColor }}
				className="ple-cropperBlock ple-cropper__block">
				{state.isCover ? (
					<span
						style={{ backgroundImage: `url('${props.src}')` }}
						className="ple-cropperBlock__image ple-cropperBlock__image-cover"/>
				) : (
					<span
						className={classNames(
							'ple-cropperBlock__image',
							{ 'ple-cropperBlock__image-resize': (props.size !== 'cover') }
						)}>
						<img
							src={props.src}
							style={Object.assign({},
								state.size !== 'cover' && {
									width: size[0],
									transform: `translate(${position[0]}, ${position[1]})`
								}
							)}
							alt="image"/>
					</span>
				)}
				<div
					onMouseDown={(e) => this._moveStart(e)}
					onTouchStart={(e) => this._moveStart(e)}
					style={Object.assign({},
						state.size !== 'cover' && {
							width: size[0],
							height: size[1],
							transform: `translate(${position[0]}, ${position[1]})`
						}
					)}
					className={classNames(
						'ple-cropperBlock__control',
						{ 'ple-cropperBlock__control-active': (props.size !== 'cover') }
					)}>
					<button
						type="button"
						title="resize-lt"
						onMouseDown={(e) => this._resizeStart(e)}
						onTouchStart={(e) => this._resizeStart(e)}
						className="ple-cropperBlock__resize ple-cropperBlock__resize-lt">
						<i className="ple-sp-ico ple-abs ple-ico-clamp"/>
					</button>
					<button
						type="button"
						title="resize-rt"
						onMouseDown={(e) => this._resizeStart(e)}
						onTouchStart={(e) => this._resizeStart(e)}
						className="ple-cropperBlock__resize ple-cropperBlock__resize-rt">
						<i className="ple-sp-ico ple-abs ple-ico-clamp"/>
					</button>
					<button
						type="button"
						title="resize-lb"
						onMouseDown={(e) => this._resizeStart(e)}
						onTouchStart={(e) => this._resizeStart(e)}
						className="ple-cropperBlock__resize ple-cropperBlock__resize-lb">
						<i className="ple-sp-ico ple-abs ple-ico-clamp"/>
					</button>
					<button
						type="button"
						title="resize-rb"
						onMouseDown={(e) => this._resizeStart(e)}
						onTouchStart={(e) => this._resizeStart(e)}
						className="ple-cropperBlock__resize ple-cropperBlock__resize-rb">
						<i className="ple-sp-ico ple-abs ple-ico-clamp"/>
					</button>
				</div>
			</figure>
		);
	}

}
Block.displayName = 'Block';
Block.defaultProps = {
	src: '',
	position: '',
	size: '',
	bgColor: '#fff',
};


export default Block;