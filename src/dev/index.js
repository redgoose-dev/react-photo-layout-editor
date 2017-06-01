import React from 'react';
import { render } from 'react-dom';

import PhotoLayoutEditor from '../PhotoLayoutEditor';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../PhotoLayoutEditor/style/app.scss';


class TestApp extends React.Component {

	constructor() {
		super();

		this._photoLayoutEditor = null;
	}

	render() {
		return (
			<div className="test-app">
				<PhotoLayoutEditor
					key={0}
					side={{
						items: [
							'http://goose.redgoose.me/data/upload/original/201705/rg-20170515-000130.jpg',
							'http://goose.redgoose.me/data/upload/original/201705/rg-20170515-000134.jpg',
							'http://goose.redgoose.me/data/upload/original/201501/a93e9f2c844c4e8d6a80c89c9e3840ec.jpg'
						],
						visible: true,
					}}
					ref={(r) => { this._photoLayoutEditor = r }}/>

				<hr/>

				<article className="api-control">
					<h1>Controller</h1>
					<section>
						<h1>basic</h1>
						<nav>
							<button
								type="button"
								onClick={() => {
									this._photoLayoutEditor.api.layout.toggleSide();
								}}>
								call test
							</button>
						</nav>
					</section>
				</article>
			</div>
		);
	}
}


render(<TestApp/>, document.getElementById('app'));
