import * as types from '../actions/types';


const initialSettings = {
	grid: {
		setting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
		},
		blockColor: '#ddd',
		layout: [
			{ layout: { x: 0, y: 0, w: 2, h: 2 } },
			{ layout: { x: 2, y: 0, w: 1, h: 2 } },
			{ layout: { x: 3, y: 0, w: 2, h: 1 } },
			{ layout: { x: 3, y: 1, w: 1, h: 1 } },
		],
	},
	side: {
		visible: true,
		items: [],
	},
};


function setting(state=null, action)
{
	switch (action.type) {
		case types.INIT_SETTING:
			return Object.assign({}, initialSettings, action.value);
			break;

		default:
			return state;
	}
}


export default setting;