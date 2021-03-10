import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Icon from '~/components/Icon';
import * as panel from '~/store/panel';
import * as api from '~/api';

const Navigation = () => {
  const storeFiles = useRecoilState(panel.files);
  const filesExist = useRecoilValue(panel.filesExist);
  const filesActiveExist = useRecoilValue(panel.filesActiveExist);

  function removeItems()
  {
    const [ files ] = storeFiles;
    let selected = [];
    files.forEach((o,k) => {
      if (o.active) selected.push(k);
    });
    if (!confirm(`Are you sure you want to delete ${selected.length} photos?`)) return;
    api.files.remove(storeFiles, selected);
  }

  return (
    <nav className="ple-navigation" onClick={e => e.stopPropagation()}>
      <div>
        <button
          type="button"
          disabled={!filesExist || !filesActiveExist}
          onClick={() => {}}>
          <Icon name="input"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={!filesExist}
          onClick={() => api.files.selectAll(storeFiles)}>
          <Icon name="maximize"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => api.files.add(storeFiles)}>
          <Icon name="plus"/>
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={!filesExist || !filesActiveExist}
          onClick={removeItems}>
          <Icon name="trash"/>
        </button>
      </div>
    </nav>
  );
};
Navigation.displayName = 'PanelNavigation';

export default Navigation;
