import React from 'react';
import { render } from 'react-dom';

import PhotoLayoutEditor from './PhotoLayoutEditor';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './PhotoLayoutEditor/style/app.scss';


class TestApp extends React.Component {

	constructor() {
		super();

		this._photoLayoutEditor = null;
	}

	render() {
		return (
			<div className="test-app">
				<PhotoLayoutEditor
					side={{
						foo: 'bar',
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
								   this._photoLayoutEditor.api.foo();
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
