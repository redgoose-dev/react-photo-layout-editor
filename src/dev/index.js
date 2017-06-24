import React from 'react';
import { render } from 'react-dom';

import PhotoLayoutEditor from '../PhotoLayoutEditor';
import * as util from './util';

import '../PhotoLayoutEditor/style/app.scss';
import './layout.scss';


class App extends React.Component {

	constructor() {
		super();
		this._photoLayoutEditor = null;
	}

	action(id, value)
	{
		let result = null;
		let keys = [];
		switch(id)
		{
			// LAYOUT
			case 'layout.toggleSide':
				this._photoLayoutEditor.api.layout.toggleSide();
				break;

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
				let upload = this._photoLayoutEditor.api.side.upload(value.target.files, {
					start: () => {
						console.log('upload start');
					},
					progress: (loaded, total, percent) => {
						console.log('upload progress', loaded, total, percent);
					},
					complete: (res) => {
						console.log('upload complete', res);
					},
					completeAll: () => {
						console.log('upload complete all');
					},
					fail: (error) => {
						console.log('upload fail', error);
					},
				});
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
				this._photoLayoutEditor.api.grid.add({
					layout: { w: 1, h: 1 },
					color: 'rgba(126,211,33,1)',
				});
				break;
			case 'grid.remove':
				let keys = this._photoLayoutEditor.api.grid.getKeys('selected');
				//this._photoLayoutEditor.api.grid.remove(keys);
				this._photoLayoutEditor.api.grid.remove([0,1]);
				break;
		}
	}

	render()
	{
		return (
			<div className="app">
				<PhotoLayoutEditor
					side={{ files: util.pickImages(5) }}
				   body={{
				   	grid: [
						   { layout: { x: 0, y: 0, w: 2, h: 2 } },
						   { layout: { x: 2, y: 0, w: 1, h: 2 } },
						   { layout: { x: 3, y: 0, w: 2, h: 1 } },
						   { layout: { x: 3, y: 1, w: 1, h: 1 } },
					   ]
				   }}
					//uploadScript="http://localhost/lab/uploader/upload.php"
					uploadParamsConvertFunc={(file) => { return file.url; }}
					ref={(r) => { this._photoLayoutEditor = r }}/>

				<article className="api-control">
					<section>
						<h1>Layout</h1>
						<nav>
							<p>
								<button
									type="button"
									onClick={() => this.action('layout.toggleSide')}>
									Toggle side
								</button>
							</p>
						</nav>
					</section>
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
							</p>
							<p>
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
							</p>
							<p>
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
							</p>
							<p>
								<button type="button" onClick={() => this.action('grid.update')}>update</button>
								<button type="button" onClick={() => this.action('grid.add')}>add</button>
								<button type="button" onClick={() => this.action('grid.remove')}>remove</button>
								<button type="button" onClick={() => this.action('grid.shuffle')}>shuffle</button>
								<button type="button" onClick={() => this.action('grid.assignImages')}>assign images</button>
								<button type="button" onClick={() => this.action('grid.assignImage')}>assign image</button>
							</p>
						</nav>
					</section>
				</article>
			</div>
		);
	}

}


render(<App/>, document.getElementById('app'));