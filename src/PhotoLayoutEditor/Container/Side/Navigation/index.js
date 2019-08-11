import React from 'react';


class SideNavigation extends React.Component {

	constructor(props) {
		super(props);

		this.comps = {
			inputFile: null,
		};
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
		const { props, state, comps } = this;

		return (
			<nav className="ple-sideNavigation ple-side__navigation">
				<div className="ple-sideNavigation__wrap">
					<button type="button" title="attach images" onClick={props.onAttach}>
						<i className="ple-sp-ico ple-ico-reply ple-abs">Moving the image to grid block</i>
					</button>
					<button type="button" title="toggle select" onClick={props.onToggleSelect}>
						<i className="ple-sp-ico ple-ico-select ple-abs">Toggle all select</i>
					</button>
					<span title="upload images" key={state.timestamp}>
						<input
							ref={(r) => { comps.inputFile = r; }}
							type="file"
							onChange={(e) => this.upload(e)} multiple />
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
SideNavigation.displayName = 'Navigation';
SideNavigation.defaultProps = {
	onRemove: function() {},
	onToggleSelect: function() {},
	onAttach: function() {},
	onUpload: function() {},
};


export default SideNavigation;