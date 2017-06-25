import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';

import App from './App';


const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.getElementById('app')
	)
};

render(App);

if (module.hot)
{
	module.hot.accept('./App', () => {
		const NextApp = require('./App'); // TODO: WTF??
		render(App);
	});
}