import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Container from './Container';

import reducers from './reducers';
import API from './API';


class PhotoLayoutEditor extends React.Component {

	static displayName = 'PhotoLayoutEditor';
	static defaultProps = {
		body: {
			setting: {},
			blockColor: '#dddddd',
			grid: []
		},
		side: {
			files: [],
			visible: true
		},
		uploadScript: null,
		uploadParamsConvertFunc: null
	};

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