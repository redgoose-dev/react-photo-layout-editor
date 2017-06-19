import * as types from '../actions/types';
import * as defaults from './defaults';


let nextFileId = 0;


/**
 * Reducers
 */

// base
export default function base(state=defaults.side, action)
{
	let newState = null;
	let n = null;

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

		case types.SIDE_UPDATE_SELECTED:
			if (!(action.value && action.value.length)) return state;
			newState = Object.assign([], state);

			action.value.forEach((o) => {
				if (!newState.files[o.index]) return;
				newState.files[o.index].active = o.active;
			});

			return newState;
			break;

		case types.SIDE_UPDATE_PROGRESS:
			return {
				...state,
				progressPercent: action.value
			};

		default:
			return state;
	}
}