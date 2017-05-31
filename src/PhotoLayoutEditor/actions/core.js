import { INIT_SETTING } from './types';


export function setting(value)
{
	return {
		type: INIT_SETTING,
		value,
	};
}