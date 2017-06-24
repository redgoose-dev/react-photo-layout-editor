import * as types from './types';


export function open(key, item)
{
	return {
		type: types.CROPPER_OPEN,
		item,
		key
	};
}

export function close(key, position, size)
{
	return {
		type: types.CROPPER_CLOSE,
		key,
		position,
		size
	};
}