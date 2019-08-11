import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Container from './Container';
import reducers from './reducers';
import API from './API';


class PhotoLayoutEditor extends React.Component {

	constructor(props)
	{
		super(props);
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

PhotoLayoutEditor.displayName = 'PhotoLayoutEditor';
PhotoLayoutEditor.defaultProps = {
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

export default PhotoLayoutEditor;