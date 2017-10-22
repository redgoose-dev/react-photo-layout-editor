import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Container from './PhotoLayoutEditor/Container/index';

import reducers from './PhotoLayoutEditor/reducers/index';
import API from './PhotoLayoutEditor/API/index';

import './PhotoLayoutEditor/style/app.scss';


class PhotoLayoutEditor extends React.Component {

	static displayName = 'PhotoLayoutEditor';

	constructor()
	{
		super();

		// set store
		this.store = createStore(reducers);

		// set api
		this.api = new API(this.store);
	}

	render()
	{
		const { props } = this;

		return (
			<Provider store={this.store}>
				<Container parent={{ preference: props, api: this.api }}/>
			</Provider>
		);
	}

}

export default PhotoLayoutEditor;