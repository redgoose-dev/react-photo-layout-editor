import { combineReducers } from 'redux';

import * as core from './core';
import grid from './grid';
import side from './side';
import cropper from './cropper';


export default combineReducers({

	// settings
	setting: core.setting,

	// api
	api: core.api,

	// keyboard event
	keyboard: core.keyboard,

	// data tree
	tree: combineReducers({
		side,
		grid,
		cropper
	}),

});