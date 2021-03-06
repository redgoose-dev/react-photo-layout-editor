import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import Icon from '~/components/Icon';
import * as panel from '~/store/panel';

const Navigation = props => {
  const {
    disabledAttach,
    disabledSelectAll,
    disabledRemove,
    onClickAttach,
    onClickSelectAll,
    onClickUpload,
    onClickRemove,
  } = props;

  // TODO: 여기서 리코일을 활용하면 대부분의 `props`를 빼버릴 수 있을것이다.

  return (
    <nav className="ple-navigation">
      <div>
        <button
          type="button"
          disabled={disabledAttach}
          onClick={onClickAttach}>
          <Icon name="input"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={disabledSelectAll}
          onClick={onClickSelectAll}>
          <Icon name="maximize"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={onClickUpload}>
          <Icon name="upload"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={disabledRemove}
          onClick={onClickRemove}>
          <Icon name="trash"/>
        </button>
      </div>
    </nav>
  );
};
Navigation.displayName = 'PanelNavigation';
Navigation.propTypes = {
  disabledAttach: PropTypes.bool,
  disabledSelectAll: PropTypes.bool,
  disabledRemove: PropTypes.bool,
  onClickAttach: PropTypes.func,
  onClickSelectAll: PropTypes.func,
  onClickUpload: PropTypes.func,
  onClickRemove: PropTypes.func,
};

export default Navigation;
