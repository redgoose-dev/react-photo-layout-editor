import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import * as body from '~/store/body';
import * as keyboard from '~/libs/keyboard';
import * as callbacks from '~/libs/callbacks';
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

  /**
   * select block
   *
   * @param {number} key
   */
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

  function onUpdateStartGrid()
  {
    timeStamp[0] = new Date().getTime();
  }
  function onUpdateStopGrid(layout)
  {
    timeStamp[1] = new Date().getTime();
    if (timeStamp[1] - timeStamp[0] > 500)
    {
      let newGrid = [];
      grid.forEach((o,k) => {
        newGrid.push({
          ...o,
          layout: {
            x: layout[k].x,
            y: layout[k].y,
            w: layout[k].w,
            h: layout[k].h,
          },
        });
      });
      callbacks.run('update', {
        type: 'grid',
        value: newGrid,
      });
    }
    timeStamp = [];
  }

  // lifecycles
  useEffect(() => {
    return () => {};
  }, []);

  return grid?.length > 0 && (
    <>
      <div className="ple-body" onClick={() => selectBlock(null)}>
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
                {item.image && (
                  <figure style={{
                    backgroundImage: `url('${item.image.src}')`,
                    backgroundPosition: item.image.position,
                    backgroundSize: item.image.size,
                  }}/>
                )}
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
