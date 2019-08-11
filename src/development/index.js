import React from 'react';
import ReactDOM from 'react-dom';
import PhotoLayoutEditor from '../PhotoLayoutEditor';
import * as util from './util';
import '../PhotoLayoutEditor/style/app.scss';
import './index.scss';


class App extends React.Component {

	constructor(props)
	{
		super(props);
		this._photoLayoutEditor = null;
	}

	action(id, value)
	{
		let result = null;
		let keys = [];
		let preference = null;

		switch(id)
		{
			// SIDE
			case 'side.add':
				this._photoLayoutEditor.api.side.add(util.pickImages(3));
				break;
			case 'side.selection':
				result = this._photoLayoutEditor.api.side.selection([0,2,4,6,8,10]);
				break;
			case 'side.select':
				this._photoLayoutEditor.api.side.select({
					0: { active: false },
					1: { active: true },
					2: { active: false },
					3: { active: true }
				});
				break;
			case 'side.toggleSelectAll':
				this._photoLayoutEditor.api.side.toggleSelectAll();
				break;
			case 'side.selectedRemoveItems':
				keys = this._photoLayoutEditor.api.side.getKeys('selected');
				this._photoLayoutEditor.api.side.remove(keys);
				break;
			case 'side.clear':
				this._photoLayoutEditor.api.side.clear();
				break;
			case 'side.attachToGrid':
				keys = this._photoLayoutEditor.api.side.getKeys('selected');
				this._photoLayoutEditor.api.side.attachToGrid(keys);
				break;
			case 'side.upload':
				this._photoLayoutEditor.api.side.upload(value.target.files);
				break;
			case 'side.getItems':
				keys = this._photoLayoutEditor.api.side.getKeys('selected');
				result = this._photoLayoutEditor.api.side.getItems(keys);
				console.log('side.getItems', result);
				break;
			case 'side.getImages':
				keys = this._photoLayoutEditor.api.side.getKeys('selected');
				result = this._photoLayoutEditor.api.side.getImages(keys);
				console.log('side.getImages', result);
				break;

			// GRID
			case 'grid.getKeys':
				//result = this._photoLayoutEditor.api.grid.getKeys('all');
				result = this._photoLayoutEditor.api.grid.getKeys('selected');
				//result = this._photoLayoutEditor.api.grid.getKeys('value', [0,2,4,6,8]);
				console.log('get keys:', result);
				break;
			case 'grid.getBlocks':
				//result = this._photoLayoutEditor.api.grid.getBlocks('all');
				result = this._photoLayoutEditor.api.grid.getBlocks('selected');
				//result = this._photoLayoutEditor.api.grid.getBlocks('value', [0,2,4,6,8]);
				console.log('get blocks:', result);
				break;
			case 'grid.shuffle':
				this._photoLayoutEditor.api.grid.shuffle({ w: 3, h: 3 });
				break;
			case 'grid.assignImages':
				this._photoLayoutEditor.api.grid.assignImages(util.pickImages(4));
				break;
			case 'grid.assignImage':
				this._photoLayoutEditor.api.grid.assignImage(0, util.pickImages(1)[0]);
				break;
			case 'grid.update':
				let result = {};
				let blocks = this._photoLayoutEditor.api.grid.getBlocks('selected');
				if (!Object.keys(blocks).length) return;
				Object.keys(blocks).forEach((k) => {
					blocks[k].color = 'rgba(126,211,33,1)';
				});
				this._photoLayoutEditor.api.grid.update(blocks);
				break;
			case 'grid.add':
				this._photoLayoutEditor.api.grid.add([{
					layout: { w: 1, h: 1 },
					color: 'rgba(126,211,33,1)',
				}]);
				break;
			case 'grid.remove':
				let keys = this._photoLayoutEditor.api.grid.getKeys('selected');
				this._photoLayoutEditor.api.grid.remove(keys);
				//this._photoLayoutEditor.api.grid.remove([0,1]);
				break;
			case 'grid.select':
				this._photoLayoutEditor.api.grid.select([0,2,3]);
				break;
			case 'grid.unselect':
				this._photoLayoutEditor.api.grid.unselect([2,3]);
				break;
			case 'grid.toggleSelectAll':
				this._photoLayoutEditor.api.grid.toggleSelectAll();
				break;
			case 'grid.duplicate':
				keys = this._photoLayoutEditor.api.grid.getKeys('selected');
				this._photoLayoutEditor.api.grid.duplicate(keys);
				break;
			case 'grid.getPreference':
				result = this._photoLayoutEditor.api.grid.getPreference();
				console.log('side.getPreference', result);
				break;
			case 'grid.setPreference':
				this._photoLayoutEditor.api.grid.setPreference({
					width: 80,
					column: 6,
					innerMargin: 5,
				});
				break;

			// Util
			case 'util.toggleSide':
				this._photoLayoutEditor.api.util.toggleSide();
				break;
			case 'util.export.side':
				result = this._photoLayoutEditor.api.util.export('side');
				console.log('export(side)', result);
				break;
			case 'util.export.grid':
				result = this._photoLayoutEditor.api.util.export('grid');
				console.log('export(grid)', result);
				break;
			case 'util.export.preference':
				result = this._photoLayoutEditor.api.util.export('preference');
				console.log('export(preference)', result);
				break;
			case 'util.export.all':
				result = this._photoLayoutEditor.api.util.export('all');
				console.log('export(all)', result);
				break;
			case 'util.import.side':
				result = this._photoLayoutEditor.api.util.import({ side: util.pickImages(3) }, true);
				break;
			case 'util.import.grid':
				this._photoLayoutEditor.api.util.import({
					grid: [
						{ color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
						{ color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
						{ color: '#b188ff', layout: { w: 3, h: 1, y: 2, x: 0 } },
					]
				}, true);
				break;
			case 'util.import.preference':
				preference = this._photoLayoutEditor.api.util.export('preference');
				preference = Object.assign({}, preference, {
					width: 120,
					height: 80,
					innerMargin: 2,
					bgColor: '#ffefc2'
				});
				this._photoLayoutEditor.api.util.import({ preference });
				break;
			case 'util.import.all':
				preference = this._photoLayoutEditor.api.util.export('preference');
				this._photoLayoutEditor.api.util.import({
					side: util.pickImages(3),
					grid: [
						{ color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
						{ color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
					],
					preference: Object.assign({}, preference, {
						width: 120,
						height: 80,
						innerMargin: 2,
						bgColor: '#ffefc2'
					})
				});
				break;
			case 'util.makeImage':
				let makeImage = this._photoLayoutEditor.api.util.makeImage('jpg', .9, 2, 'base64');
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

	render()
	{
		return (
			<div className="app">
				<PhotoLayoutEditor
					ref={(r) => { this._photoLayoutEditor = r }}
					side={{ files: util.pickImages(5) }}
					body={{
						grid: [
							{ layout: { x: 0, y: 0, w: 2, h: 2 } },
							{ layout: { x: 2, y: 0, w: 1, h: 2 } },
							{ layout: { x: 3, y: 0, w: 2, h: 1 } },
							{ layout: { x: 3, y: 1, w: 1, h: 1 } },
							{ layout: { x: 4, y: 1, w: 1, h: 1 } },
						]
					}}
					//uploadScript="http://localhost/lab/uploader/upload.php"
					uploadParamsConvertFunc={(file) => { return file.url; }}
					updateStoreFunc={() => console.warn('update store')}
					callback={{
						init: () => { console.log('init component') },
						sideUploadStart: () => {
							console.log('side/upload start');
						},
						sideUploadProgress: (loaded, total, percent) => {
							console.log('side/upload progress', loaded, total, percent);
						},
						sideUploadComplete: (res) => {
							console.log('side/upload complete', res);
						},
						sideUploadCompleteAll: () => {
							console.log('side/upload complete all');
						},
						sideUploadFail: (error) => {
							console.log('side/upload fail', error);
						},
						sideRemove: (images) => {
							console.log('side/remove', images);
						},
					}}
				/>

				<article className="api-control">
					<section>
						<h1>Side</h1>
						<nav>
							<p>
								<button
									type="button"
									onClick={() => this.action('side.add')}>
									add files
								</button>
								<button
									type="button"
									onClick={() => this.action('side.selectedRemoveItems')}>
									remove items
								</button>
								<button
									type="button"
									onClick={() => this.action('side.clear')}>
									clear
								</button>
								<button
									type="button"
									onClick={() => this.action('side.attachToGrid')}>
									attach to grid
								</button>
								<button
									type="button"
									onClick={() => this.action('side.selection')}>
									selection
								</button>
								<button
									type="button"
									onClick={() => this.action('side.select')}>
									select
								</button>
								<button
									type="button"
									onClick={() => this.action('side.toggleSelectAll')}>
									toggle select all
								</button>
								<button
									type="button"
									onClick={() => this.action('side.getItems')}>
									get items
								</button>
								<button
									type="button"
									onClick={() => this.action('side.getImages')}>
									get images
								</button>
							</p>
							<p>
								<label>
									<strong>upload image</strong><br/>
									<input
										type="file"
										multiple={true}
										onChange={(e) => this.action('side.upload', e)}/>
								</label>
							</p>
						</nav>
					</section>
					<section>
						<h1>Grid</h1>
						<nav>
							<p>
								<button type="button" onClick={() => this.action('grid.getKeys')}>get keys</button>
								<button type="button" onClick={() => this.action('grid.getBlocks')}>get blocks</button>
								<button type="button" onClick={() => this.action('grid.getPreference')}>get preference</button>
								<button type="button" onClick={() => this.action('grid.setPreference')}>set preference</button>
								<button type="button" onClick={() => this.action('grid.update')}>update</button>
								<button type="button" onClick={() => this.action('grid.add')}>add</button>
								<button type="button" onClick={() => this.action('grid.remove')}>remove</button>
								<button type="button" onClick={() => this.action('grid.shuffle')}>shuffle</button>
								<button type="button" onClick={() => this.action('grid.assignImages')}>assign images</button>
								<button type="button" onClick={() => this.action('grid.assignImage')}>assign image</button>
								<button type="button" onClick={() => this.action('grid.duplicate')}>duplicate</button>
								<button type="button" onClick={() => this.action('grid.select')}>select</button>
								<button type="button" onClick={() => this.action('grid.unselect')}>unselect</button>
								<button type="button" onClick={() => this.action('grid.toggleSelectAll')}>toggle select all</button>
							</p>
						</nav>
					</section>
					<section>
						<h1>Util</h1>
						<nav>
							<p>
								<button type="button" onClick={() => this.action('util.toggleSide')}>Toggle side</button>
							</p>
							<p>
								<button type="button" onClick={() => this.action('util.export.side')}>Export(side)</button>
								<button type="button" onClick={() => this.action('util.export.grid')}>Export(grid)</button>
								<button type="button" onClick={() => this.action('util.export.preference')}>Export(preference)</button>
								<button type="button" onClick={() => this.action('util.export.all')}>Export(all)</button>
								<button type="button" onClick={() => this.action('util.makeImage')}>Make image</button>
							</p>
							<p>
								<button type="button" onClick={() => this.action('util.import.side')}>Import(side)</button>
								<button type="button" onClick={() => this.action('util.import.grid')}>Import(grid)</button>
								<button type="button" onClick={() => this.action('util.import.preference')}>Import(preference)</button>
								<button type="button" onClick={() => this.action('util.import.all')}>Import(all)</button>
							</p>
						</nav>
					</section>
					<section>
						<h1>Make image area</h1>
						<figure id="makeImageArea"/>
					</section>
				</article>

			</div>
		);
	}

}

ReactDOM.render(<App/>, document.getElementById('app'));