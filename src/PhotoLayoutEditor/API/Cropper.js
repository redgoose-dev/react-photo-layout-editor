import * as actions from '../actions';
import * as libs from '../lib';


export default class Cropper {

	constructor(store)
	{
		this.store = store;
	}

	open(index)
	{
		const state = this.store.getState();
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

		this.store.dispatch(actions.cropper.open(item));
	};

	close()
	{
		console.log('close cropper');

		this.store.dispatch(actions.cropper.close());
	}

}