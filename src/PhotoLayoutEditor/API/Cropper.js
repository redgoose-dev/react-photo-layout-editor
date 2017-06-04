import * as actions from '../actions';
import * as libs from '../lib';


export default function Cropper(store) {

	this.open = function(index)
	{
		const state = store.getState();
		let item = null;

		try {
			const n = libs.object.findObjectValueInArray(state.tree.body.grid, 'index', index);
			if (typeof n !== 'number') throw 'Not found item';
			item = state.tree.body.grid[n];
			if (!item.image) throw 'Not found image in item';
		} catch(e) {
			alert(e);
			return;
		}

		store.dispatch(actions.cropper.open(item));
	};

	this.close = function()
	{
		console.log('close cropper');

		store.dispatch(actions.cropper.close());
	}

}