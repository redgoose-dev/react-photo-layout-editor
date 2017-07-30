import * as types from '../actions/types';
import * as libs from '../lib';
import * as defaults from './defaults';


let lastGridId = 0;
let shuffleIndex = 0;


/**
 * setting
 *
 * @param {Object} state
 * @param {*} action
 * @return {Object}
 */
export function setting(state=defaults.setting.body.setting, action)
{
	switch(action.type)
	{
		case types.INIT_PLE:
			try {
				return {
					...state,
					...action.preference.body.setting
				};
			} catch(e) {
				return state;
			}

		case types.GRID_SETTING_UPDATE:
			return {
				...state,
				...action.value,
			};
	}
	return state;
}

/**
 * grid
 *
 * @param {Object} state
 * @param {*} action
 * @return {Object}
 */
export function grid(state={}, action)
{
	let newState = Object.assign({}, state);

	switch (action.type)
	{
		case types.INIT_PLE:
			let grid = {};
			try {
				if ((action.preference.body.grid instanceof Array))
				{
					action.preference.body.grid.forEach((o, k) => {
						grid[k] = o;
					});
				}
				else if (typeof action.preference.body.grid === 'object')
				{
					grid = action.preference.body.grid;
				}
				else
				{
					throw 'error';
				}
				Object.keys(grid).forEach((o) => {
					newState[lastGridId++] = {
						color: defaults.setting.body.blockColor,
						...grid[o],
						indexPrefix: shuffleIndex,
					};
				});
			} catch(e) {
				newState = {};
			}
			return newState;

		case types.GRID_ADD_BLOCK:
			newState[lastGridId++] = {
				color: defaults.setting.body.blockColor,
				layout: { x: Infinity, y: Infinity, w: 1, h: 1 },
				...action.value,
				indexPrefix: shuffleIndex,
			};
			return newState;

		case types.GRID_REMOVE_BLOCK:
			if (!action.keys || !action.keys.length) return state;
			action.keys.forEach(o => {
				delete newState[o];
			});
			return newState;

		case types.GRID_SHUFFLE_BLOCKS:
			return Object.keys(newState).map((k) => {
				return {
					...newState[k],
					layout: {
						x: libs.number.randomRange(0, action.value.x - 1),
						y: libs.number.randomRange(0, action.value.y - 1),
						w: libs.number.randomRange(1, action.value.w),
						h: libs.number.randomRange(1, action.value.h),
					},
					indexPrefix: shuffleIndex++,
				};
			});

		case types.GRID_DUPLICATE_BLOCK:
			action.keys.forEach(k => {
				if (!newState[k]) return;
				newState[lastGridId++] = Object.assign({}, newState[k]);
			});
			return newState;

		case types.GRID_CHANGE_COLOR:
			action.keys.forEach(k => {
				if (!newState[k]) return;
				newState[k].color = action.color;
			});
			return newState;

		case types.GRID_ATTACH_IMAGES:
			if (!libs.object.isArray(action.value)) return state;

			if (action.activeBlocks && action.activeBlocks.length)
			{
				Object.keys(newState).forEach((k) => {
					if (!action.value.length) return;
					if (action.activeBlocks.indexOf(k) === -1) return;
					newState[k].image = {
						src: action.value.splice(0,1)[0],
						position: '50% 50%',
						size: 'cover'
					};
				});
			}
			else
			{
				Object.keys(newState).forEach((k) => {
					if (newState[k].image) return;
					if (!action.value || !action.value.length) return;
					newState[k].image = {
						src: action.value.splice(0,1)[0],
						position: '50% 50%',
						size: 'cover'
					};
				});
				if (action.value.length)
				{
					action.value.forEach((o, k) => {
						newState[lastGridId++] = {
							color: defaults.setting.body.blockColor,
							layout: {
								x: (Object.keys(state).length + k) % action.columns,
								y: Infinity,
								w: 1,
								h: 1
							},
							image: {
								src: o,
								position: '50% 50%',
								size: 'cover',
							},
							indexPrefix: shuffleIndex
						};
					});
				}
			}

			return newState;

		case types.GRID_ATTACH_IMAGE:
			if (!(action.image && typeof action.image === 'string')) return state;
			if (!newState[action.keys]) return state;

			newState[action.keys].image = {
				src: action.image,
				position: '50% 50%',
				size: 'cover',
			};
			return newState;

		case types.GRID_UPDATE_BLOCKS:
			return Object.assign({}, state, action.value);

		case types.CROPPER_CLOSE:
			if (!newState[action.key]) return state;
			if (action.position)
			{
				newState[action.key].image.position = action.position;
			}
			if (action.size)
			{
				newState[action.key].image.size = action.size;
			}
			return newState;
	}

	return state;
}

/**
 * active block
 *
 * @param {Array} state
 * @param {*} action
 * @return {Array}
 */
export function activeBlock(state=[], action)
{
	let newState = Object.assign([], state);

	switch (action.type)
	{
		case types.GRID_ACTIVE_BLOCK:
			return action.value;

		case types.GRID_REMOVE_BLOCK:
			if (action.keys && action.keys.length)
			{
				action.keys.forEach(o => {
					if (newState.indexOf(o) < 0) return;
					newState.splice(newState.indexOf(o), 1);
				});
				return newState;
			}
			return [];
	}

	return state;
}