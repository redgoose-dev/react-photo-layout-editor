import * as types from './types';


export function open(options)
{
	return {
		type: types.CROPPER_OPEN,
		value: options,
	};
}

export function close(options)
{
	return {
		type: types.CROPPER_CLOSE,
		value: options,
	};
}