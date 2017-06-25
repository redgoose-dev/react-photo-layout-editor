import * as types from './types';


export function addBlock(value)
{
	return {
		type: types.GRID_ADD_BLOCK,
		value: value,
	};
}

export function removeBlock(keys) {
	return {
		type: types.GRID_REMOVE_BLOCK,
		keys,
	};
}

export function shuffleBlocks(options)
{
	return {
		type: types.GRID_SHUFFLE_BLOCKS,
		value: options,
	}
}

export function duplicateBlock(keys)
{
	return {
		type: types.GRID_DUPLICATE_BLOCK,
		keys
	};
}

export function updateBlocks(blocks)
{
	return {
		type: types.GRID_UPDATE_BLOCKS,
		value: blocks,
	}
}

export function activeBlock(keys)
{
	return {
		type: types.GRID_ACTIVE_BLOCK,
		value: keys
	};
}

export function changeColorBlock(keys, color)
{
	return {
		type: types.GRID_CHANGE_COLOR,
		keys,
		color,
	}
}

export function updateSetting(value)
{
	return {
		type: types.GRID_SETTING_UPDATE,
		value: value,
	};
}

export function attachImages(images, cols, activeBlocks)
{
	return {
		type: types.GRID_ATTACH_IMAGES,
		value: images,
		columns: cols,
		activeBlocks: activeBlocks,
	}
}

export function attachImage(keys, image)
{
	return {
		type: types.GRID_ATTACH_IMAGE,
		keys,
		image,
	};
}