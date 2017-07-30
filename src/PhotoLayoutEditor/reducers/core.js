import * as types from '../actions/types';
import Keyboard from '../lib/Keyboard';
import * as defaults from './defaults';


export function setting(state=null, action)
{
	let newState = Object.assign({}, state);

	switch (action.type) {
		case types.INIT_PLE:
			newState = Object.assign({}, {
				base: {
					...defaults.setting.base,
					uploadScript: action.preference.uploadScript || defaults.setting.base.uploadScript,
					uploadParamsConvertFunc: action.preference.uploadParamsConvertFunc || defaults.setting.base.uploadParamsConvertFunc
				},
				side: {
					...defaults.setting.side,
					...action.preference.side
				},
				body: {
					...defaults.setting.body,
					...action.preference.body,
				}
			});
			return newState;

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

export function element(state=null, action)
{
	switch (action.type) {
		case types.INIT_PLE:
			return action.element;

		default:
			return state;
	}
}