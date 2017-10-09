import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions';

import Body from './Body';
import Side from './Side';


class Container extends React.Component {

	static displayName = 'Container';

	static defaultProps = {
		parent: {},
		dispatch: null,
		tree: {},
		setting: null,
	};

	constructor()
	{
		super();

		this.el = null;
	}

	componentWillReceiveProps(nextProps)
	{
		const { props } = this;

		this.checkChangeStore(props, nextProps);
	}

	componentDidMount()
	{
		const { props } = this;

		props.dispatch(actions.core.init(
			props.parent.api,
			props.parent.preference || { side: {}, body: {} },
			this.el
		));
	}

	checkChangeStore(prev, next)
	{
		if (!(next.setting.base.updateStoreFunc && typeof next.setting.base.updateStoreFunc === 'function')) return null;
		if (
			prev.tree.side.visible !== next.tree.side.visible ||
			prev.tree.side.files !== next.tree.side.files ||
			prev.tree.body.setting !== next.tree.body.setting ||
			prev.tree.body.grid !== next.tree.body.grid
		) {
			next.setting.base.updateStoreFunc();
		}
	}

	render()
	{
		const { props } = this;

		return (
			<div
				ref={(r) => { this.el = r; }}
				className={classNames('ple-editor', { 'ple-side-active': props.tree.side.visible })}>
				{props.setting && (
					<div className="ple-wrap">
						<Body/>
						<Side/>
					</div>
				)}
			</div>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(Container);