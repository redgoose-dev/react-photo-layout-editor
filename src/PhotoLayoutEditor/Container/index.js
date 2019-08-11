import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as actions from '../actions';
import Body from './Body';
import Side from './Side';


class Container extends React.Component {

  constructor(props)
  {
    super(props);
    this.el = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    const { props } = this;
    if ((!!props.setting.base.updateStoreFunc && typeof props.setting.base.updateStoreFunc === 'function') && (
      prevProps.tree.side.visible !== props.tree.side.visible ||
      prevProps.tree.side.files !== props.tree.side.files ||
      prevProps.tree.body.setting !== props.tree.body.setting ||
      prevProps.tree.body.grid !== props.tree.body.grid
    )) {
      props.setting.base.updateStoreFunc();
    }
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
Container.displayName = 'Container';
Container.defaultProps = {
  parent: {},
  dispatch: null,
  tree: {},
  setting: null,
};


export default connect((state) => Object.assign({}, state, {}))(Container);