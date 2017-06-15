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
		switch(id)
		{
			case 'layout.toggleSide':
				this._photoLayoutEditor.api.layout.toggleSide();
				break;

			case 'side.add':
				this._photoLayoutEditor.api.side.add(value);
				break;
			case 'side.remove':
				this._photoLayoutEditor.api.side.remove([1, 2]);
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
					<h1>Controller</h1>
					<section>
						<h1>Side</h1>
						<nav>
							<button
								type="button"
								onClick={() => this.action('side.add', util.pickImages(3))}>
								Add files
							</button>
						</nav>
					</section>
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
				</article>
			</div>
		);
	}
}


render(<App/>, document.getElementById('app'));