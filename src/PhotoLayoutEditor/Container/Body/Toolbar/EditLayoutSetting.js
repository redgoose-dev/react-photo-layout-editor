import React from 'react';
import $ from 'jquery/dist/jquery.slim';
import ColorPicker from 'react-simple-colorpicker';
import className from 'classnames';


export default class EditLayoutSetting extends React.Component {

	static displayName = 'EditLayoutSetting';

	static defaultProps = {
		submit: (e) => {},
		setting: null,
		defaultSetting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
			bgColor: 'rgba(255,255,255,1)',
		},
	};

	constructor(props)
	{
		super(props);
		this.state = {
			...props.defaultSetting,
			...props.setting,
			popup_bgColor: false,
		};
	}

	componentWillReceiveProps()
	{
		const { props } = this;

		this.setState({
			...props.defaultSetting,
			...props.setting,
		});
	}

	activeBgColorPopup(sw, e)
	{
		const { state } = this;
		const cTarget = e ? e.currentTarget : null;

		sw = sw || !state.popup_bgColor;

		if (sw)
		{
			$(document).on('click.pleEditBgColor', (e) => {
				if ($(e.target).closest('.ple-edit-bgColor__popup').length) return;
				if (!(e.target === cTarget) && !(e.target.parentNode === cTarget))
				{
					this.activeBgColorPopup(false);
				}
			});
		}
		else
		{
			$(document).off('click.pleEditBgColor');
		}

		this.setState({ popup_bgColor: sw });
	}

	_submit(e)
	{
		e.preventDefault();
		this.props.submit(this.state);
	}

	_reset()
	{
		this.setState({
			...this.props.defaultSetting
		});
	}

	_change(e)
	{
		switch(e.target.type) {
			case 'text':
				this.setState({ [e.target.name]: e.target.value });
				break;
			case 'number':
				this.setState({ [e.target.name]: parseInt(e.target.value) });
				break;
		}
	}

	_openBgColorPicker(e)
	{
		e.persist();
		const { state } = this;
		this.activeBgColorPopup(null, e);
	}

	render()
	{
		const { state, props } = this;

		return (
			<form onSubmit={this._submit.bind(this)} className="ple-edit-setting">
				<fieldset className="ple-edit-setting__form">
					<legend>Settings form</legend>
					<h1 className="ple-edit-setting__title">Settings</h1>
					<dl>
						<dt><label htmlFor="frm_width">Width</label></dt>
						<dd className="ple-type-input">
							<input
								type="number" name="width" id="frm_width"
								min={1} max={999} maxLength={3}
								value={state.width}
								onChange={this._change.bind(this)}
								required/>
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_height">Height</label></dt>
						<dd className="ple-type-input">
							<input
								type="number" name="height" id="frm_height"
								min={1} max={999}
								value={state.height}
								onChange={this._change.bind(this)}
								required/>
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_column">Column</label></dt>
						<dd className="ple-type-input">
							<input
								type="number" name="column" id="frm_column"
								min={1} max={99}
								value={state.column}
								onChange={this._change.bind(this)}
								required />
							<span>ea</span>
						</dd>
					</dl>
					<dl className="ple-type-input">
						<dt><label htmlFor="frm_outerMargin">Outer margin</label></dt>
						<dd>
							<input
								type="number" name="outerMargin" id="frm_outerMargin"
								min={0} max={500}
								value={state.outerMargin}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl className="ple-type-input">
						<dt><label htmlFor="frm_innerMargin">Inner margin</label></dt>
						<dd>
							<input
								type="number" name="innerMargin" id="frm_innerMargin"
								min={0} max={500}
								value={state.innerMargin}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_bgColor">Bg color</label></dt>
						<dd>
							<div className="ple-edit-bgColor">
								<span className={className('ple-edit-bgColor__inputBox', {
									'ple-edit-bgColor__inputBox-active': state.popup_bgColor
								})}>
									<input
										type="text"
										name="bgColor"
										id="frm_bgColor"
										value={state.bgColor}
										onChange={this._change.bind(this)}
										onClick={this._openBgColorPicker.bind(this)}
										readOnly={true}
										required={true}
										className="ple-edit-bgColor__input"
									    style={{ backgroundColor: state.bgColor }}
									/>
								</span>
								{state.popup_bgColor && (
									<div className="ple-edit-bgColor__popup">
										<div className="ple-edit-bgColor__picker">
											<ColorPicker
												onChange={(color) => this.setState({ bgColor: color })}
												color={state.bgColor}/>
										</div>
									</div>
								)}
							</div>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_freeMode">Free mode</label></dt>
						<dd className="ple-type-checkbox">
							<label>
								<input
									type="radio" name="freeMode" id="frm_freeMode"
									onChange={() => this.setState({ freeMode: true })}
									checked={state.freeMode}/>
								<span>true</span>
							</label>
							<label>
								<input
									type="radio" name="freeMode"
									onChange={() => this.setState({ freeMode: false })}
									checked={!state.freeMode}/>
								<span>false</span>
							</label>
						</dd>
					</dl>
				</fieldset>

				<nav className="ple-edit-setting__buttons">
					<span>
						<button type="button" onClick={this._reset.bind(this)}>Reset</button>
					</span>
					<span>
						<button type="submit" className="ple-submit">Apply</button>
					</span>
				</nav>
			</form>
		);
	}

}