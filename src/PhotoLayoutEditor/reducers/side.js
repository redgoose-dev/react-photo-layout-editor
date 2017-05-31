import { combineReducers } from 'redux';
import * as types from '../actions/types';


const initialLayout = {
	visible: true,
};
let nextFileId = 0;


/**
 * Change active
 *
 * @param {Object} item
 * @param {Number} n
 * @param {String} key press key name and select type
 * @param {Number} first
 * @param {Number} activeCount
 */
function changeActive(item, n, key, first, activeCount)
{
	switch(key)
	{
		case 'all':
			return Object.assign({}, item, { active: true });
		case 'none':
			return Object.assign({}, item, { active: false });
		case 'cmd':
		case 'ctrl':
			if (item.id === n)
			{
				return Object.assign({}, item, { active: !item.active });
			}
			else
			{
				return item;
			}
		case 'shift':
			first = first || 0;
			if (first < n)
			{
				if (item.id >= first && item.id <= n)
				{
					return Object.assign({}, item, { active: true });
				}
				else
				{
					return Object.assign({}, item, { active: false });
				}
			}
			else
			{
				if (item.id <= first && item.id >= n)
				{
					return Object.assign({}, item, { active: true });
				}
				else
				{
					return Object.assign({}, item, { active: false });
				}
			}

			return item;
	}

	if (activeCount >= 2 && item.id === n)
	{
		return Object.assign({}, item, { active: true });
	}
	else if (item.id === n)
	{
		return Object.assign({}, item, { active: !item.active });
	}
	else
	{
		return Object.assign({}, item, { active: false });
	}
}

/**
 * Get active items
 *
 * @param {Array} items
 * @return {Array}
 */
function getActiveItems(items)
{
	return items.map(o => {
		if (o.active) return o;
	});
}


function layout(state=initialLayout, action)
{
	switch (action.type) {
		case types.INIT_SETTING:
			return {
				...state,
				visible: action.value.side.visible,
			};
			break;
		case types.SIDE_VISIBLE:
			return {
				...state,
				visible: action.value,
			};
			break;
		case types.SIDE_TOGGLE:
			return {
				...state,
				visible: !state.visible,
			};
			break;
		default:
			return state;
	}
}

function files(state=[], action)
{
	switch (action.type) {
		case types.ADD_FILES:
			return [
				...state,
				...action.files.map((o) => {
					return {
						id: nextFileId++,
						image: o,
						active: false,
					};
				}),
			];

		case types.REMOVE_FILES:
			if (!action.ids.length) return state;
			let selectItems = [];
			state.forEach(o => {
				if (action.ids.indexOf(o.id) < 0) selectItems.push(o);
			});
			return selectItems;

		case types.CHANGE_ACTIVE_FILE:
			return state.map(item => {
				return changeActive(
					item,
					action.num,
					action.keyName,
					action.firstNum,
					getActiveItems(state).length,
				);
			});

		default:
			return state;
	}
}


const ple = combineReducers({
	layout,
	files,
});

export default ple;