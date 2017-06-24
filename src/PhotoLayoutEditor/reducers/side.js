import * as types from '../actions/types';
import * as defaults from './defaults';


let nextFileId = 0;


/**
 * Reducers
 */

// base
export default function base(state=defaults.side, action)
{
	let newState = Object.assign({}, state);
	let files = {};

	switch (action.type) {
		case types.INIT_PLE:
			try {
				action.preference.side.files.forEach(o => {
					files[nextFileId++] = { image: o, active: false }
				});
				return {
					...state,
					...action.preference.side,
					files: {
						...state.files,
						...files,
					},
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
			action.files.forEach((o) => {
				files[nextFileId++] = { image: o, active: false }
			});
			return {
				...state,
				files: {
					...state.files,
					...files,
				}
			};

		case types.SIDE_REMOVE_FILES:
			if (!action.keys.length) return state;
			action.keys.forEach(o => {
				delete newState.files[o];
			});
			return newState;

		case types.SIDE_UPDATE_SELECTED:
			if (!(action.value && Object.keys(action.value).length)) return state;
			Object.keys(action.value).forEach(k => {
				let key = action.value[k].key;
				if (!newState.files[key]) return;
				newState.files[key].active = action.value[k].active;
			});
			return newState;

		case types.SIDE_UPDATE_PROGRESS:
			return {
				...state,
				progressPercent: action.value
			};

		default:
			return state;
	}
}