import React from 'react';
import { render } from 'react-dom';

import PhotoLayoutEditor from '../PhotoLayoutEditor';
import * as util from './util';

import '../PhotoLayoutEditor/style/app.scss';


class App extends React.Component {

	constructor() {
		super();
		this._photoLayoutEditor = null;
	}

	action(id, value)
	{
		let result = null;
		let ids = [];
		switch(id)
		{
			case 'layout.toggleSide':
				this._photoLayoutEditor.api.layout.toggleSide();
				break;

			case 'side.add':
				this._photoLayoutEditor.api.side.add(util.pickImages(3));
				break;
			case 'side.selection':
				result = this._photoLayoutEditor.api.side.selection([0,2,4,6,8,10]);
				break;
			case 'side.select':
				this._photoLayoutEditor.api.side.select([
					{ id: 0, active: false },
					{ id: 1, active: true },
					{ id: 2, active: false },
					{ id: 3, active: true }
				]);
				break;
			case 'side.toggleSelectAll':
				this._photoLayoutEditor.api.side.toggleSelectAll();
				break;
			case 'side.selectedRemoveItems':
				ids = this._photoLayoutEditor.api.side.getId('selected');
				this._photoLayoutEditor.api.side.remove(ids);
				break;
			case 'side.clear':
				this._photoLayoutEditor.api.side.clear();
				break;
			case 'side.attachToGrid':
				ids = this._photoLayoutEditor.api.side.getId('selected');
				this._photoLayoutEditor.api.side.attachToGrid(ids);
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
				ids = this._photoLayoutEditor.api.side.getId('selected');
				result = this._photoLayoutEditor.api.side.getItems(ids);
				console.log('side.getItems', result);
				break;
			case 'side.getImages':
				ids = this._photoLayoutEditor.api.side.getId('selected');
				result = this._photoLayoutEditor.api.side.getImages(ids);
				console.log('side.getImages', result);
				break;

			case 'grid.getIndex':
				result = this._photoLayoutEditor.api.grid.getIndex('value', [0,2,4,6,8]);
				console.log('get index:', result);
				break;
			case 'grid.getBlocks':
				result = this._photoLayoutEditor.api.grid.getBlocks('all');
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
				ids = this._photoLayoutEditor.api.grid.getBlocks('selected');
				ids = ids.map((o) => {
					o.color = 'rgba(126,211,33,1)';
					return o;
				});
				this._photoLayoutEditor.api.grid.update(ids);
				break;
			case 'grid.add':
				this._photoLayoutEditor.api.grid.add({
					layout: { w: 1, h: 1 },
					color: 'rgba(126,211,33,1)',
				});
				break;
			case 'grid.remove':
				this._photoLayoutEditor.api.grid.remove([0,2]);
				break;
		}
	}

	render()
	{
		return (
			<div className="app">
				<PhotoLayoutEditor
					side={{ files: util.pickImages(5) }}
					//uploadScript="http://localhost/lab/uploader/upload.php"
					uploadParamsConvertFunc={(file) => { return file.url; }}
					ref={(r) => { this._photoLayoutEditor = r }}/>
				<hr/>
				<article className="api-control">
					<section>
						<h1>Layout</h1>
						<nav>
							<button
								type="button"
								onClick={() => this.action('layout.toggleSide')}>
								Toggle side
							</button>
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
								<button type="button" onClick={() => this.action('grid.getIndex')}>get index</button>
								<button type="button" onClick={() => this.action('grid.getBlocks')}>get blocks</button>
								<button type="button" onClick={() => this.action('grid.shuffle')}>shuffle</button>
								<button type="button" onClick={() => this.action('grid.assignImages')}>assign images</button>
								<button type="button" onClick={() => this.action('grid.assignImage')}>assign image</button>
							</p>
							<p>
								<button type="button" onClick={() => this.action('grid.update')}>update</button>
								<button type="button" onClick={() => this.action('grid.add')}>add</button>
								<button type="button" onClick={() => this.action('grid.remove')}>remove</button>
							</p>
						</nav>
					</section>
				</article>
			</div>
		);
	}

}


render(<App/>, document.getElementById('app'));