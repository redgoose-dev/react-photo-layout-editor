import * as types from '../actions/types';
import * as defaults from './defaults';


let nextFileId = 0;


/**
 * Change active
 *
 * @param {Object} item
 * @param {Number} start
 * @param {Number} end
 * @param {String} type press key name and select type
 * @param {Number} activeCount
 */
function changeActive(item, start, end, type, activeCount)
{
	switch(type)
	{
		case 'all':
			return Object.assign({}, item, { active: true });
		case 'none':
			return Object.assign({}, item, { active: false });
		case 'add':
			if (item.id === end)
			{
				return Object.assign({}, item, { active: !item.active });
			}
			else
			{
				return item;
			}
		case 'range':
			start = start || 0;
			if (start < end)
			{
				if (item.id >= start && item.id <= end)
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
				if (item.id <= start && item.id >= end)
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

	// not fount key
	if (activeCount >= 2 && item.id === end)
	{
		return Object.assign({}, item, { active: true });
	}
	else if (item.id === end)
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


/**
 * Reducers
 */

// base
export default function base(state=defaults.side, action)
{
	switch (action.type) {
		case types.INIT_PLE:
			try {
				return {
					...state,
					...action.preference.side,
					files: [
						...action.preference.side.files.map((o) => {
							return {
								id: nextFileId++,
								image: o,
								active: false,
							}
						})
					]
				};
			} catch(e) {
				return state;
			}

		case types.SIDE_VISIBLE:
			return {
				...state,
				visible: action.value,
			};

		case types.SIDE_TOGGLE:
			return {
				...state,
				visible: !state.visible,
			};

		case types.SIDE_ADD_FILES:
			return {
				...state,
				files: [
					...state.files,
					...action.files.map((o) => {
						return {
							id: nextFileId++,
							image: o,
							active: false,
						};
					})
				]
			};

		case types.SIDE_REMOVE_FILES:
			if (!action.ids.length) return state;
			let selectItems = [];
			state.files.forEach(o => {
				if (action.ids.indexOf(o.id) < 0) selectItems.push(o);
			});
			return {
				...state,
				files: selectItems
			};

		case types.SIDE_CHANGE_ACTIVE_FILE:
			return {
				...state,
				files: state.files.map(item => {
					return changeActive(
						item,
						action.start,
						action.end,
						action.selectType,
						getActiveItems(state.files).length,
					);
				})
			};

		case types.SIDE_UPDATE_PROGRESS:
			return {
				...state,
				progressPercent: action.value
			};

		default:
			return state;
	}
}