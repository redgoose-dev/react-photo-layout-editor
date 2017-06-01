import { combineReducers } from 'redux'

import * as core from './core';
import grid from './grid';
import side from './side';
import cropper from './cropper';


export default combineReducers({
	tree: combineReducers({
		side,
		grid,
		cropper
	}),
	setting: core.setting,
	api: core.api,
});