import * as types from '../actions/types';
import Keyboard from '../lib/Keyboard';


const initialSettings = {
	base: {
		uploadScript: null,
		uploadParamsConvertFunc: null,
	},
	grid: {
		setting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
		},
		blockColor: '#ddd',
		layout: [
			{ layout: { x: 0, y: 0, w: 2, h: 2 } },
			{ layout: { x: 2, y: 0, w: 1, h: 2 } },
			{ layout: { x: 3, y: 0, w: 2, h: 1 } },
			{ layout: { x: 3, y: 1, w: 1, h: 1 } },
		],
	},
	side: {
		files: [],
		visible: true,
		progressPercent: null,
	},
};


export function setting(state=null, action)
{
	switch (action.type) {
		case types.INIT_PLE:
			return Object.assign({}, {
				base: {
					...initialSettings.base,
					uploadScript: action.preference.uploadScript || initialSettings.base.uploadScript,
					uploadParamsConvertFunc: action.preference.uploadParamsConvertFunc || initialSettings.base.uploadParamsConvertFunc
				},
				side: {
					...initialSettings.side,
					...action.preference.side
				},
				grid: {
					...initialSettings.grid,
					...action.preference.grid,
				}
			});
			break;

		default:
			return state;
	}
}


export function api(state=null, action)
{
	switch (action.type) {
		case types.INIT_PLE:
			return action.api;

		default:
			return state;
	}
}


export function keyboard(state=null, action)
{
	switch (action.type) {
		case types.INIT_PLE:
			return new Keyboard();

		default:
			return state;
	}
}