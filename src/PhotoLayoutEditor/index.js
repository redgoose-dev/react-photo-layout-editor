import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import API from './API';

import Container from './Container';


const store = createStore(reducers);


export default class PhotoLayoutEditor extends React.Component {

	constructor(props)
	{
		super();
		API.init(store);
	}

	componentDidMount()
	{}

	render()
	{
		const { props } = this;

		return (
			<Provider store={store}>
				<Container preference={props}/>
			</Provider>
		);
	}

}