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
					if (files[o] && files[o].id)
					{
						result.push(files[o].id);
					}
				});
				break;
			case 'all':
			default:
				Object.keys(files).forEach((o) => {
					console.log(o);
					//result.push(o.id);
				});
				break;
		}

		return result;
	}

	/**
	 * get index in item
	 * TODO 안쓸예정
	 *
	 * @param {String} mode
	 * @param {Array} ids
	 */
	getIndex(mode=null, ids=[])
	{
		const state = this.store.getState();
		const { files } = state.tree.side;
		let result = [];

		switch(mode)
		{
			case 'selected':
				files.forEach((o, k) => {
					if (o.active)
					{
						result.push(k);
					}
				});
				break;
			case 'value':
				files.forEach((o, k) => {
					if (ids.indexOf(o.id) !== -1)
					{
						result.push(k);
					}
				});
				break;
			case 'all':
			default:
				result = files.map((o, k) => k);
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
	 * @param {Array} ids
	 * @param {Boolean} active
	 * @return {Error}
	 */
	selection(ids=[], active=true)
	{
		try
		{
			let selected = this.getIndex('value', ids);
			if (selected.length <= 0)
			{
				throw new Error('not found select item');
			}
			selected = selected.map((o) => ({ index: o, active: active }));
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
	 * @param {Array} value
	 */
	select(value=[])
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
			let ids = this.getKeys('all');
			this.selection(ids, !(activeCount > 0));
		}
	}

	/**
	 * remove items
	 *
	 * @param {Array} index
	 * @return {Error}
	 */
	remove(index=[])
	{
		try
		{
			if (!index.length)
			{
				throw new Error('Not found items.')
			}
			this.store.dispatch(actions.side.removeFiles(index));
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
		let index = this.getKeys('all');
		this.store.dispatch(actions.side.removeFiles(index))
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
	 * @param {Array} ids
	 * @return {Error}
	 */
	attachToGrid(ids=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;

		try
		{
			let selectedImages = this.getImages(ids);
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
	 * @param {Array} ids
	 * @return {Array}
	 */
	getItems(ids=[])
	{
		const state = this.store.getState();
		const { side } = state.tree;
		const index = this.getIndex('value', ids);
		let result = [];

		index.forEach((o) => {
			if (side.files[o])
			{
				result.push(side.files[o]);
			}
		});

		return result;
	}

	/**
	 * get images
	 *
	 * @param {Array} ids
	 * @return {Array}
	 */
	getImages(ids=[])
	{
		let items = this.getItems(ids);
		return items.map((o) => {
			return o.image;
		});
	}

}