import * as actions from '../actions';


export default class Cropper {

	constructor(store)
	{
		this.store = store;
	}

	open(key)
	{
		const state = this.store.getState();
		let item = null;

		try {
			item = state.tree.body.grid[key];
			if (!item.image) throw 'Not found image in item';
		} catch(e) {
			alert(e);
			return;
		}

		this.store.dispatch(actions.cropper.open(key, item));
	};

	close(key, position, size)
	{
		this.store.dispatch(actions.cropper.close(key, position, size));
	}

}