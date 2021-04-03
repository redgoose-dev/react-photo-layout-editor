import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as panel from '~/store/panel';
import * as api from '~/api';
import * as body from '~/store/body';
import Button from './Button';
import Icon from '~/components/Icon';
import Preference from './Preference';
import './index.scss';

const Toolbar = () => {
  const storeOpenPanel = useRecoilState(panel.open);
  const storeGrid = useRecoilState(body.grid);
  const [ open ] = storeOpenPanel;
  const [ grid, setGrid ] = storeGrid;
  const [ showPreference, setShowPreference ] = useState(false);

  function togglePreference(e)
  {
    e.stopPropagation();
    if (!showPreference)
    {
      window.on('click.pleShowPreference', e => {
        if (e.target.closest('.ple-toolbar__preference > div')) return;
        window.off('click.pleShowPreference');
        setShowPreference(false);
      });
    }
    else
    {
      window.off('click.pleShowPreference');
    }
    setShowPreference(!showPreference);
  }

  // lifecycles
  useEffect(() => {
    return () => {
      window.off('click.pleShowPreference');
    };
  }, []);

  return (
    <nav className="ple-toolbar">
      <dl className="ple-toolbar__wrap">
        <dt>
          <div className="ple-toolbar__preference">
            <Button
              title="Preference"
              active={false}
              focus={showPreference}
              onClick={togglePreference}>
              <Icon name="setting"/>
            </Button>
            {showPreference && (
              <div>
                <div>
                  <Preference
                    onClose={() => setShowPreference(false)}/>
                </div>
              </div>
            )}
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
          {!!false && (
            <Button
              title="Edit block"
              active={true}
              onClick={() => {}}>
              <Icon name="pen"/>
            </Button>
          )}
          {!!false && (
            <Button
              title="Remove image in block"
              active={true}
              onClick={() => {}}>
              <Icon name="slash"/>
            </Button>
          )}
          {!!false && (
            <Button
              title="Duplicate block"
              active={true}
              onClick={() => {}}>
              <Icon name="copy"/>
            </Button>
          )}
          {!!false && (
            <Button
              title="Remove block"
              active={true}
              onClick={() => {}}>
              <Icon name="trash"/>
            </Button>
          )}
          {!!false && (
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
            className={[ 'ple-side-toggle', open && 'ple-side-toggle--on' ].filter(Boolean).join(' ')}
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
