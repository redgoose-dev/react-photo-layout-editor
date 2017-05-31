import { combineReducers } from 'redux'

import setting from './setting';
import body from './body';
import side from './side';
import cropper from './cropper';


export default combineReducers({
	tree: combineReducers({
		side,
		body,
		cropper
	}),
	setting,
});