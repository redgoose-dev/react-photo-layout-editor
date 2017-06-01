import * as types from './types';


export function init(api, preference)
{
	return {
		type: types.INIT_PLE,
		api,
		preference,
	};
}