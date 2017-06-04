import React from 'react';


export default class EditLayoutSetting extends React.Component {

	static defaultProps = {
		submit: () => {},
		setting: null,
		defaultSetting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			...props.defaultSetting,
			...props.setting,
		};
	}

	componentWillReceiveProps() {
		this.setState({
			...this.props.defaultSetting,
			...this.props.setting,
		});
	}

	_reset() {
		this.setState({
			...this.props.defaultSetting
		});
	}

	_change(e) {
		this.setState({
			[e.target.name] : parseInt(e.target.value)
		});
	}

	render() {
		const { state, props } = this;

		return (
			<form onSubmit={(event) => {
				props.submit(state);
				event.preventDefault();
			}}>
				<fieldset>
					<legend>Settings form</legend>
					<h1>Settings</h1>
					<dl>
						<dt><label htmlFor="frm_width">Width</label></dt>
						<dd className="type-input">
							<input
								type="number" name="width" id="frm_width"
								min={1} max={999} maxLength={3}
								value={this.state.width}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_height">Height</label></dt>
						<dd className="type-input">
							<input
								type="number" name="height" id="frm_height"
								min={1} max={999}
								value={this.state.height}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_column">Column</label></dt>
						<dd className="type-input">
							<input
								type="number" name="column" id="frm_column"
								min={1} max={99}
								value={this.state.column}
								onChange={this._change.bind(this)}
								required />
							<span>ea</span>
						</dd>
					</dl>
					<dl className="type-input">
						<dt><label htmlFor="frm_outerMargin">Outer margin</label></dt>
						<dd>
							<input
								type="number" name="outerMargin" id="frm_outerMargin"
								min={0} max={500}
								value={this.state.outerMargin}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl className="type-input">
						<dt><label htmlFor="frm_innerMargin">Inner margin</label></dt>
						<dd>
							<input
								type="number" name="innerMargin" id="frm_innerMargin"
								min={0} max={500}
								value={this.state.innerMargin}
								onChange={this._change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_freeMode">Free mode</label></dt>
						<dd className="type-checkbox">
							<label>
								<input
									type="radio" name="freeMode" id="frm_freeMode"
									onChange={() => this.setState({ freeMode: true })}
									checked={this.state.freeMode}
								/>
								<span>true</span>
							</label>
							<label>
								<input
									type="radio" name="freeMode"
									onChange={() => this.setState({ freeMode: false })}
									checked={!this.state.freeMode}
								/>
								<span>false</span>
							</label>
						</dd>
					</dl>
				</fieldset>
				<nav>
					<span>
						<button
							type="button"
							onClick={this._reset.bind(this)}>
							Reset
						</button>
					</span>
					<span>
						<button type="submit" className="submit">Apply</button>
					</span>
				</nav>
			</form>
		);
	}

}