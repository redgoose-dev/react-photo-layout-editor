import * as types from './types';


export function init(api, preference, element)
{
	return {
		type: types.INIT_PLE,
		api,
		preference,
		element,
	};
}