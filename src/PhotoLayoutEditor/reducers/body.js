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
 * visible toolbar buttons
 *
 * @param {Object} state
 * @param {*} action
 * @return {Object}
 */
export function visibleToolbarButtons(state=defaults.body.visibleToolbarButtons, action)
{
	switch(action.type) {
		case types.GRID_ACTIVE_BLOCK:
			if (action.value && action.value.length)
			{
				return Object.assign({},
					state,
					{
						removeImage: true,
						duplicate: true,
						removeBlock: true,
						editColor: true,
					},
					action.isImage && action.value.length === 1 ? {
						edit: true,
					} : {
						edit: false,
					}
				);
			}
			else
			{
				return {
					...state,
					edit: false,
					removeImage: false,
					duplicate: false,
					removeBlock: false,
					editColor: false,
				};
			}

		case types.GRID_REMOVE_BLOCK:
			return {
				...state,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: false,
			};

		case types.GRID_REMOVE_IMAGES:
			return {
				...state,
				edit: false,
			};
	}
	return state;
}

/**
 * grid
 *
 * @param {Object} state
 * @param {*} action
 * @return {Array}
 */
export function grid(state={}, action)
{
	let newState = Object.assign({}, state);
	let n = null;

	switch (action.type)
	{
		case types.INIT_PLE:
			let grid = defaults.setting.body.grid;
			try {
				grid = action.preference.body.grid;
			}
			catch(e) {}

			grid.forEach((o) => {
				newState[lastGridId++] = {
					color: null,
					...o,
					indexPrefix: shuffleIndex,
				};
			});
			return newState;

		case types.GRID_ADD_BLOCK:
			lastGridId = lastGridId === null ? 0 : lastGridId + 1;
			return state.concat({
				color: null,
				layout: { x: Infinity, y: Infinity, w: 1, h: 1 },
				...action.value,
				index: lastGridId,
				indexPrefix: shuffleIndex,
			});

		case types.GRID_REMOVE_BLOCK:
			if (!action.index || !action.index.length) return state;
			newState = Object.assign([], state);
			for (let i=0; i<action.index.length; i++)
			{
				const n = libs.object.findObjectValueInArray(newState, 'index', action.index[i]);
				newState.splice(n, 1);
			}
			return newState;

		case types.GRID_SHUFFLE_BLOCKS:
			shuffleIndex++;
			newState = Object.assign([], state);
			return newState.map((o, k) => {
				return {
					...o,
					layout: {
						x: libs.number.randomRange(0, action.value.x - 1),
						y: libs.number.randomRange(0, action.value.y - 1),
						w: libs.number.randomRange(1, action.value.w),
						h: libs.number.randomRange(1, action.value.h),
					},
					indexPrefix: shuffleIndex,
				};
			});

		case types.GRID_DUPLICATE_BLOCK:
			newState = Object.assign([], state);
			action.index.forEach((o, k) => {
				n = libs.object.findObjectValueInArray(state, 'index', o);
				if (!newState[n]) return;
				lastGridId = lastGridId === null ? 0 : lastGridId + 1;
				newState = newState.concat({
					...newState[n],
					index: lastGridId,
				});
			});
			return newState;

		case types.GRID_CHANGE_COLOR:
			newState = Object.assign([], state);
			action.item.forEach((o, k) => {
				n = libs.object.findObjectValueInArray(newState, 'index', o);
				if (newState[n]) newState[n].color = action.color;
			});
			return newState;

		case types.ATTACH_IMAGES:
			if (!libs.object.isArray(action.value)) return state;
			newState = Object.assign([], state);

			if (action.activeBlocks && action.activeBlocks.length)
			{
				newState.forEach((o, k) => {
					if (!action.value.length) return;
					if (action.activeBlocks.indexOf(o.index) < 0) return;
					o.image = {
						src: action.value.splice(0,1)[0],
						position: '50% 50%',
						size: 'cover',
					};
				});
			}
			else
			{
				newState.forEach((o) => {
					if (o.image) return;
					if (!action.value || !action.value.length) return;
					o.image = {
						src: action.value.splice(0,1)[0],
						position: '50% 50%',
						size: 'cover',
					};
				});
				if (action.value.length)
				{
					action.value.forEach((o, k) => {
						lastGridId = lastGridId === null ? 0 : lastGridId + 1;
						newState = newState.concat({
							color: null,
							layout: {
								x: (state.length + k) % action.columns,
								y: Infinity,
								w: 1,
								h: 1
							},
							image: {
								src: o,
								position: '50% 50%',
								size: 'cover',
							},
							index: lastGridId,
						});
					});
				}
			}

			return newState;

		case types.ATTACH_IMAGE:
			if (!(action.image && typeof action.image === 'string')) return state;
			if (!(action.index !== null && typeof action.index === 'number')) return state;

			newState = Object.assign([], state);
			n = libs.object.findObjectValueInArray(newState, 'index', action.index);
			newState[n].image = {
				src: action.image,
				position: '50% 50%',
				size: 'cover',
			};

			return newState;

		case types.GRID_REMOVE_IMAGES:
			newState = Object.assign([], state);
			action.value.forEach((o) => {
				n = libs.object.findObjectValueInArray(newState, 'index', o);
				if (newState[n] && newState[n].image)
				{
					delete newState[n].image;
				}
			});
			return newState;

		case types.GRID_UPDATE_BLOCKS:
			return Object.assign([], state, action.value);

		case types.CROPPER_CLOSE:
			newState = Object.assign([], state);
			n = libs.object.findObjectValueInArray(state, 'index', action.value.index);

			newState[n].image.position = action.value.position;
			newState[n].image.size = action.value.size;

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
	let newState = null;

	switch (action.type)
	{
		case types.GRID_ACTIVE_BLOCK:
			return action.value;

		case types.GRID_REMOVE_BLOCK:
			if (action.index && action.index.length)
			{
				newState = Object.assign([], state);
				action.index.forEach((o, k) => {
					if (newState.indexOf(o) < 0) return;
					newState.splice(newState.indexOf(o), 1);
				});
				return newState;
			}
			return [];
	}

	return state;
}