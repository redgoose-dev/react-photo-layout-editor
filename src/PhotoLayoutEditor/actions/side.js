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
		type: types.REMOVE_FILES,
		ids: ids,
	};
}

export function changeActiveFile(n, key, first)
{
	return {
		type: types.CHANGE_ACTIVE_FILE,
		num: n,
		keyName: key,
		firstNum: first,
	};
}