import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as panel from '~/store/panel';
import * as callbacks from '~/libs/callbacks';
import Button from './Button';
import Icon from '~/components/Icon';

const Toolbar = () => {
  const open = useRecoilValue(panel.open);

  return (
    <nav className="ple-toolbar">
      <dl className="ple-toolbar__wrap">
        <dt>
          <Button
            title="Preference"
            onClick={() => {}}>
            <Icon name="setting"/>
          </Button>
          <Button
            title="Shuffle"
            onClick={() => {}}>
            <Icon name="shuffle"/>
          </Button>
          <Button
            title="Add Block"
            onClick={() => {}}>
            <Icon name="plus"/>
          </Button>
          <Button
            title="Select All Blocks"
            onClick={() => {}}>
            <Icon name="maximize"/>
          </Button>
        </dt>
        <dd>
          <Button
            title={`${open ? 'Close' : 'Open'} Panel`}
            className={[ 'ple-toggle', open && 'ple-toggle--on' ].filter(Boolean).join(' ')}
            onClick={() => callbacks.run('update', { type: 'togglePanel' })}>
            <Icon name="arrow-left"/>
          </Button>
        </dd>
      </dl>
    </nav>
  );
};
Toolbar.displayName = 'Toolbar';

export default Toolbar;
