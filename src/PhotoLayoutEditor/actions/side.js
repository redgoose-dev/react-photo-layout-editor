import * as types from './types';


// control visible side bar
export function visible(sw)
{
	return {
		type: types.SIDE_VISIBLE,
		value: sw,
	};
}

// toggle side bar
export function toggle()
{
	return {
		type: types.SIDE_TOGGLE,
	};
}

export function addFiles(files)
{
	return {
		type: types.SIDE_ADD_FILES,
		files: files,
	};
}

export function removeFiles(ids)
{
	return {
		type: types.SIDE_REMOVE_FILES,
		ids: ids,
	};
}

export function updateSelected(value)
{
	return {
		type: types.SIDE_UPDATE_SELECTED,
		value
	};
}

export function updateProgress(percent)
{
	return {
		type: types.SIDE_UPDATE_PROGRESS,
		value: percent
	};
}