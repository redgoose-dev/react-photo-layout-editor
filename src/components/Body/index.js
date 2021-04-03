import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import * as body from '~/store/body';
import * as keyboard from '~/libs/keyboard';
import ReactGridLayout from 'react-grid-layout';
// import Cropper from '~/components/Cropper';
import './index.scss';

const Body = () => {
  const grid = useRecoilValue(body.grid);
  const preference = useRecoilValue(body.preference);
  const [ selectedBlocks, setSelectedBlocks ] = useRecoilState(body.gridSelectedBlocks);
  const gridWidth = (preference.width * preference.column) +
    (preference.innerMargin * (preference.column - 1)) +
    (preference.outerMargin * 2);
  let timeStamp = [];

  function selectBlock(key = null)
  {
    if (typeof key !== 'number')
    {
      setSelectedBlocks([]);
      return;
    }
    switch (keyboard.getActiveKeyNames()[0])
    {
      case 'meta':
      case 'alt':
      case 'shift':
        let newSelectedBlocks = Object.assign([], selectedBlocks);
        let idx = newSelectedBlocks.indexOf(key);
        if (idx > -1)
        {
          newSelectedBlocks.splice(idx, 1);
        }
        else
        {
          newSelectedBlocks.push(key);
        }
        setSelectedBlocks(newSelectedBlocks);
        break;
      default:
        setSelectedBlocks(selectedBlocks.indexOf(key) > -1 ? [] : [ key ]);
        return;
    }
  }

  function updateBlocks()
  {
    //
  }

  function onUpdateStartGrid()
  {
    timeStamp[0] = new Date().getTime();
  }

  function onUpdateStopGrid(layout, oldItem, newItem, placeholder, e, element)
  {
    timeStamp[1] = new Date().getTime();
    if (timeStamp[1] - timeStamp[0] > 500)
    {
      console.log('onUpdateStopGrid');
    }
    timeStamp = [];
  }

  // lifecycles
  useEffect(() => {
    return () => {};
  }, []);

  return grid?.length > 0 && (
    <>
      <div className="ple-body">
        <div className="ple-body__wrap" style={{ width: `${gridWidth}px` }}>
          <ReactGridLayout
            width={gridWidth}
            autoSize={true}
            cols={preference.column}
            rowHeight={preference.height}
            margin={[ preference.innerMargin, preference.innerMargin ]}
            containerPadding={[ preference.outerMargin, preference.outerMargin ]}
            verticalCompact={!preference.freeMode}
            className="ple-grid"
            onDragStart={onUpdateStartGrid}
            onDragStop={onUpdateStopGrid}
            onResizeStart={onUpdateStartGrid}
            onResizeStop={onUpdateStopGrid}>
            {grid.map(item => (
              <div
                key={item.key}
                data-grid={item.layout}
                className={[
                  'ple-grid-item',
                  selectedBlocks.indexOf(item.key) > -1 && 'ple-grid-item--active',
                ].filter(Boolean).join(' ')}
                style={{ backgroundColor: item.color || preference.blockColor }}
                onClick={e => {
                  e.stopPropagation();
                  selectBlock(item.key);
                }}>
                <figure style={{
                  //
                }}/>
              </div>
            ))}
          </ReactGridLayout>
        </div>
      </div>
      <div>TODO: Cropper component</div>
    </>
  );
};
Body.displayName = 'Body';

export default Body;
