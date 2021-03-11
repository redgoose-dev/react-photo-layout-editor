import React from 'react';
import { useRecoilState } from 'recoil';
import * as panel from '~/store/panel';
import * as api from '~/api';
import * as body from '~/store/body';
import Button from './Button';
import Icon from '~/components/Icon';
import Preference from './Preference';

const Toolbar = () => {
  const storeOpenPanel = useRecoilState(panel.open);
  const storeGrid = useRecoilState(body.grid);
  const [ open ] = storeOpenPanel;
  const [ grid, setGrid ] = storeGrid;

  return (
    <nav className="ple-toolbar">
      <dl className="ple-toolbar__wrap">
        <dt>
          <div className="ple-toolbar__preference">
            <Button
              title="Preference"
              active={false}
              onClick={() => {}}>
              <Icon name="setting"/>
            </Button>
            <div>
              <Preference/>
            </div>
          </div>
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
          {!!true && (
            <Button
              title="Edit block"
              active={true}
              onClick={() => {}}>
              <Icon name="pen"/>
            </Button>
          )}
          {!!true && (
            <Button
              title="Remove image in block"
              active={true}
              onClick={() => {}}>
              <Icon name="slash"/>
            </Button>
          )}
          {!!true && (
            <Button
              title="Duplicate block"
              active={true}
              onClick={() => {}}>
              <Icon name="copy"/>
            </Button>
          )}
          {!!true && (
            <Button
              title="Remove block"
              active={true}
              onClick={() => {}}>
              <Icon name="trash"/>
            </Button>
          )}
          {!!true && (
            <Button
              title="Change color"
              active={true}
              onClick={() => {}}>
              <Icon name="droplet"/>
            </Button>
          )}
        </dt>
        <dd>
          <Button
            title={`${open ? 'Close' : 'Open'} Panel`}
            className={[ 'ple-toggle', open && 'ple-toggle--on' ].filter(Boolean).join(' ')}
            onClick={() => api.panel.visible(storeOpenPanel)}>
            <Icon name="arrow-left"/>
          </Button>
        </dd>
      </dl>
    </nav>
  );
};
Toolbar.displayName = 'Toolbar';

export default Toolbar;
