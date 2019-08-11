'use strict';

// render ple
let ple = null;
ReactDOM.render(
  React.createElement(PhotoLayoutEditor, {
    ref: function(r) { ple = r; },
    body: {
      grid: [
        { layout: { x: 0, y: 0, w: 2, h: 2 } },
        { layout: { x: 2, y: 0, w: 1, h: 2 } },
        { layout: { x: 3, y: 0, w: 2, h: 1 } },
        { layout: { x: 3, y: 1, w: 1, h: 1 } },
      ]
    },
    side: {
      files: [
        'https://images.unsplash.com/photo-1561271657-fbad0db4caaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2292&q=60',
        'https://images.unsplash.com/photo-1561214380-cdcaa684cf52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
        'https://images.unsplash.com/photo-1561187273-0d2494d76346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
        'https://images.unsplash.com/photo-1561266569-ffd2ec021489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2234&q=60',
        'https://images.unsplash.com/photo-1561087867-203d3c5344d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=60',
        'https://images.unsplash.com/photo-1561148755-03553117df6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
        'https://images.unsplash.com/photo-1561155654-20461b26ee4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=60',
        'https://images.unsplash.com/photo-1561084195-ee7372303a19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
      ]
    },
    updateStoreFunc: function() {
      console.warn('update store');
    }
  }),
  document.getElementById('app')
);


// pick images
function pickImages(count=3)
{
  const sampleImages = [
    'https://images.unsplash.com/photo-1561271657-fbad0db4caaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2292&q=60',
    'https://images.unsplash.com/photo-1561214380-cdcaa684cf52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1561187273-0d2494d76346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1561266569-ffd2ec021489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2234&q=60',
    'https://images.unsplash.com/photo-1561087867-203d3c5344d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=60',
    'https://images.unsplash.com/photo-1561148755-03553117df6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
    'https://images.unsplash.com/photo-1561155654-20461b26ee4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=60',
    'https://images.unsplash.com/photo-1561084195-ee7372303a19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
    'https://images.unsplash.com/photo-1561214380-cdcaa684cf52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1561187273-0d2494d76346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1561266569-ffd2ec021489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2234&q=60',
    'https://images.unsplash.com/photo-1561087867-203d3c5344d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=60',
    'https://images.unsplash.com/photo-1561148755-03553117df6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
  ];
  let images = Object.assign([], sampleImages);
  let result = [];

  (function get() {
    if (count <= 0) return;
    result.push(images.splice(Math.floor(Math.random() * images.length), 1)[0]);
    count--;
    get();
    if (count >= 1) get();
  })();

  return result;
}


// action
function action(id, value)
{
  switch(id)
  {
    // SIDE
    case 'side.add':
      ple.api.side.add(pickImages(3));
      break;
    case 'side.selection':
      ple.api.side.selection([1, 3, 5, 7]);
      break;
    case 'side.select':
      ple.api.side.select({
        0: { active: false },
        1: { active: true },
        2: { active: false },
        3: { active: true }
      });
      break;
    case 'side.toggleSelectAll':
      ple.api.side.toggleSelectAll();
      break;
    case 'side.selectedRemoveItems':
      ple.api.side.remove(
        ple.api.side.getKeys('selected')
      );
      break;
    case 'side.clear':
      ple.api.side.clear();
      break;
    case 'side.attachToGrid':
      ple.api.side.attachToGrid(
        ple.api.side.getKeys('selected')
      );
      break;
    case 'side.upload':
      ple.api.side.upload(value.files, {
        start: function() {
          console.log('upload start');
        },
        progress: function(loaded, total, percent) {
          console.log('upload progress', loaded, total, percent);
        },
        complete: function(res) {
          console.log('upload complete', res);
        },
        completeAll: function() {
          console.log('upload complete all');
        },
        fail: function(error) {
          console.log('upload fail', error);
        },
      });
      break;
    case 'side.getItems':
      let sideGetItems = ple.api.side.getItems(
        ple.api.side.getKeys('selected')
      );
      console.log('side.getItems', sideGetItems);
      break;
    case 'side.getImages':
      let sideGetImages = ple.api.side.getImages(
        ple.api.side.getKeys('selected')
      );
      console.log('side.getImages', sideGetImages);
      break;

    // GRID
    case 'grid.getKeys':
      console.log('get keys:', ple.api.grid.getKeys('selected'));
      break;
    case 'grid.getBlocks':
      console.log('get blocks:', ple.api.grid.getBlocks('selected'));
      break;
    case 'grid.shuffle':
      ple.api.grid.shuffle({ w: 3, h: 3 });
      break;
    case 'grid.assignImages':
      ple.api.grid.assignImages(pickImages(4));
      break;
    case 'grid.assignImage':
      ple.api.grid.assignImage(0, pickImages(1)[0]);
      break;
    case 'grid.update':
      let gridUpdate_blocks = ple.api.grid.getBlocks('selected');
      if (!Object.keys(gridUpdate_blocks).length) return;
      Object.keys(gridUpdate_blocks).forEach((k) => {
        gridUpdate_blocks[k].color = 'rgba(126,211,33,1)';
      });
      ple.api.grid.update(gridUpdate_blocks);
      break;
    case 'grid.add':
      ple.api.grid.add([{
        layout: { w: 1, h: 1 },
        color: 'rgba(126,211,33,1)',
      }]);
      break;
    case 'grid.remove':
      ple.api.grid.remove(
        ple.api.grid.getKeys('selected')
      );
      break;
    case 'grid.select':
      ple.api.grid.select([0,2,3]);
      break;
    case 'grid.unselect':
      ple.api.grid.unselect([2,3]);
      break;
    case 'grid.toggleSelectAll':
      ple.api.grid.toggleSelectAll();
      break;
    case 'grid.duplicate':
      ple.api.grid.duplicate(
        ple.api.grid.getKeys('selected')
      );
      break;
    case 'grid.getPreference':
      console.log('side.getPreference', ple.api.grid.getPreference());
      break;
    case 'grid.setPreference':
      ple.api.grid.setPreference({
        width: 80,
        column: 6,
        innerMargin: 5,
      });
      break;

    // Util
    case 'util.toggleSide':
      ple.api.util.toggleSide();
      break;
    case 'util.export.side':
      console.log('export(side)', ple.api.util.export('side'));
      break;
    case 'util.export.grid':
      console.log('export(grid)', ple.api.util.export('grid'));
      break;
    case 'util.export.preference':
      console.log('export(preference)', ple.api.util.export('preference'));
      break;
    case 'util.export.all':
      console.log('export(all)', ple.api.util.export('all'));
      break;
    case 'util.import.side':
      ple.api.util.import({ side: pickImages(3) }, true);
      break;
    case 'util.import.grid':
      ple.api.util.import({
        grid: [
          { color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
          { color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
          { color: '#b188ff', layout: { w: 3, h: 1, y: 2, x: 0 } },
        ]
      }, true);
      break;
    case 'util.import.preference':
      let utilImportPreference = ple.api.util.export('preference');
      utilImportPreference = Object.assign({}, utilImportPreference, {
        width: 120,
        height: 80,
        innerMargin: 2,
        bgColor: '#ffefc2'
      });
      ple.api.util.import({ utilImportPreference });
      break;
    case 'util.import.all':
      ple.api.util.import({
        side: pickImages(3),
        grid: [
          { color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
          { color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
        ],
        preference: Object.assign({}, ple.api.util.export('preference'), {
          width: 120,
          height: 80,
          innerMargin: 2,
          bgColor: '#ffefc2'
        })
      });
      break;
    case 'util.makeImage':
      let makeImage = ple.api.util.makeImage('jpg', .75, 1, 'base64');
      makeImage.progress(function(total, current, image) {
        console.log('PROGRESS', total, current, image);
      });
      makeImage.done(function(src) {
        console.warn('DONE');
        let output = document.getElementById('makeImageArea');
        output.innerHTML = `<img src="${src}" alt="output image"/>`;
      });
      makeImage.fail(function(error) {
        console.error('ERROR', error);
      });
      break;
  }
}