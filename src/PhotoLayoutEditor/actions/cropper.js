import * as types from './types';


export function open(item)
{
	return {
		type: types.CROPPER_OPEN,
		value: item,
	};
}

export function close(options)
{
	return {
		type: types.CROPPER_CLOSE,
		value: options,
	};
}