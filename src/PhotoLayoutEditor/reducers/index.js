import { combineReducers } from 'redux';

import * as core from './core';
import * as body from './body';
import side from './side';
import * as cropper from './cropper';


export default combineReducers({

	// settings
	setting: core.setting,

	// api
	api: core.api,

	// keyboard event
	keyboard: core.keyboard,

	// element
	element: core.element,

	// data tree
	tree: combineReducers({
		side,
		body: combineReducers({
			setting: body.setting,
			grid: body.grid,
			activeBlock: body.activeBlock
		}),
		cropper: combineReducers({
			visible: cropper.visible,
			item: cropper.item,
			key: cropper.key
		})
	})

});