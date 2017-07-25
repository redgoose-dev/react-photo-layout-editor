import * as actions from '../actions';
import * as lib from '../lib';


export default class Side {

	constructor(store)
	{
		this.store = store;
		this.uploading = false;
	}

	/**
	 * get id in item
	 *
	 * @param {String} mode
	 * @param {Array} keys
	 * @return {Array}
	 */
	getKeys(mode=null, keys=[])
	{
		const state = this.store.getState();
		const { files } = state.tree.side;
		let result = [];

		switch(mode)
		{
			case 'selected':
				Object.keys(files).forEach((o) => {
					if (files[o].active)
					{
						result.push(parseInt(o));
					}
				});
				break;
			case 'value':
				keys.forEach((o) => {
					if (files[o])
					{
						result.push(parseInt(o));
					}
				});
				break;
			case 'all':
			default:
				result = Object.keys(files).map((o) => parseInt(o));
				break;
		}

		return result;
	}

	/**
	 * Add files
	 *
	 * @param {Array} files
	 * @return {Error}
	 */
	add(files)
	{
		try
		{
			if (!(files instanceof Array))
			{
				throw new Error('not found files');
			}
			this.store.dispatch(actions.side.addFiles(files));
		}
		catch(e)
		{
			return e;
		}
	};

	/**
	 * selection items
	 *
	 * @param {Array} keys
	 * @param {Boolean} active
	 * @return {Error}
	 */
	selection(keys=[], active=true)
	{
		try
		{
			let selected = this.getKeys('value', keys);
			if (selected.length <= 0)
			{
				throw new Error('not found select item');
			}
			selected = selected.map((o) => ({ key: o, active }));
			this.store.dispatch(actions.side.updateSelected(selected));
		}
		catch(e)
		{
			return e;
		}
	}

	/**
	 * select items
	 *
	 * @param {Object} value
	 */
	select(value={})
	{
		this.store.dispatch(actions.side.updateSelected(value));
	}

	/**
	 * toggle select all
	 *
	 * @param {Boolean} active
	 */
	toggleSelectAll(active=null)
	{
		if (typeof active === 'boolean')
		{
			let selected = this.getKeys('all');
			this.selection(selected, active);
		}
		else
		{
			let activeCount = this.getKeys('selected').length;
			let keys = this.getKeys('all');
			this.selection(keys, !(activeCount > 0));
		}
	}

	/**
	 * remove items
	 *
	 * @param {Array} keys
	 * @return {Error}
	 */
	remove(keys=[])
	{
		try
		{
			if (!keys.length)
			{
				throw new Error('Not found items.')
			}
			this.store.dispatch(actions.side.removeFiles(keys));
		}
		catch(e)
		{
			return e;
		}
	}

	/**
	 * Clear items
	 */
	clear()
	{
		let keys = this.getKeys('all');
		this.store.dispatch(actions.side.removeFiles(keys))
	}

	/**
	 * Upload files
	 *
	 * @param {FileList} files
	 * @param {Object} callbacks
	 */
	upload(files, callbacks={})
	{
		/**
		 * @param {Function} callbacks.start
		 * @param {Function} callbacks.progress
		 * @param {Function} callbacks.complete
		 * @param {Function} callbacks.completeAll
		 * @param {Function} callbacks.fail
		 */
		if (this.uploading) return;

		const state = this.store.getState();
		this.uploading = true;

		if (callbacks.start) callbacks.start();

		lib.uploader(files, state.setting.base.uploadScript)
			.progress((type, res) => {
				switch(type)
				{
					case 'start':
						this.store.dispatch(actions.side.updateProgress(0));
						break;
					case 'progress':
						const percent = parseInt((res.loaded / res.total * 100));
						this.store.dispatch(actions.side.updateProgress(percent));
						if (callbacks.progress) callbacks.progress(res.loaded, res.total, percent);
						break;
					case 'done':
						this.store.dispatch(actions.side.updateProgress(null));
						if (!res.data) return;
						if (state.setting.base.uploadParamsConvertFunc)
						{
							let result = state.setting.base.uploadParamsConvertFunc(res.data);
							this.store.dispatch(actions.side.addFiles([result]));
						}
						else
						{
							this.store.dispatch(actions.side.addFiles([res.data.url]));
						}
						if (callbacks.complete) callbacks.complete(res.data);
						return;
				}
			})
			.done(() => {
				this.uploading = false;
				if (callbacks.completeAll) callbacks.completeAll();
			})
			.fail((error) => {
				this.uploading = false;
				if (callbacks.fail) callbacks.fail(error);
			});
	}

	/**
	 * attach items to grid
	 *
	 * @param {Array} keys
	 * @return {Error}
	 */
	attachToGrid(keys=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		try
		{
			let selectedImages = this.getImages(keys);
			if (!selectedImages.length)
			{
				throw new Error('not found item.');
			}
			this.store.dispatch(actions.body.attachImages(
				selectedImages,
				body.setting.column,
				body.activeBlock
			));
		}
		catch(e)
		{
			return e;
		}
	}

	/**
	 * get items
	 *
	 * @param {Array} keys
	 * @return {Object}
	 */
	getItems(keys=[])
	{
		const state = this.store.getState();
		const { side } = state.tree;
		keys = this.getKeys('value', keys);
		let result = {};
		keys.forEach((o) => {
			if (side.files[o])
			{
				result[o] = side.files[o];
			}
		});

		return result;
	}

	/**
	 * get images
	 *
	 * @param {Array} keys
	 * @return {Array}
	 */
	getImages(keys=[])
	{
		let items = this.getItems(keys);
		return Object.keys(items).map((o) => {
			return items[o].image;
		});
	}

}