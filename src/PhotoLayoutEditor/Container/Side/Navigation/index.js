import React from 'react';


export default class SideNavigation extends React.Component {

	static displayName = 'Navigation';

	static defaultProps = {
		onRemove: () => {},
		onToggleSelect: () => {},
		onAttach: () => {},
		onUpload: () => {},
	};

	constructor(props) {
		super(props);

		this.state = {
			timestamp : Date.now(),
		};
	}

	/**
	 * Upload images
	 *
	 * @param {Event} e
	 */
	upload(e) {
		this.props.onUpload(e.target.files);

		this.setState({
			timestamp : Date.now()
		});
	}

	render() {
		const { props, state } = this;

		return (
			<nav className="navigation">
				<div className="wrap">
					<button type="button" title="attach images" onClick={props.onAttach}>
						<i className="ple-sp-ico ple-ico-reply ple-abs">Moving the image to grid block</i>
					</button>
					<button type="button" title="toggle select" onClick={props.onToggleSelect}>
						<i className="ple-sp-ico ple-ico-select ple-abs">Toggle all select</i>
					</button>
					<span title="upload images" key={state.timestamp}>
						<input type="file" ref="inputFile" onChange={this.upload.bind(this)} multiple />
						<i className="ple-sp-ico ple-ico-upload ple-abs">upload images</i>
					</span>
					<button type="button" title="remove images" onClick={props.onRemove}>
						<i className="ple-sp-ico ple-ico-trash ple-abs">remove images</i>
					</button>
				</div>
			</nav>
		);
	}

}