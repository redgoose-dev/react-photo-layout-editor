import $ from 'jquery/dist/jquery.slim';

import * as actions from '../actions';
import * as lib from '../lib';


export default class Side {

	constructor(store)
	{
		this.store = store;
		this.uploading = false;
	}

	/**
	 * Check id
	 *
	 * @param {Array} ids
	 * @return {Array}
	 */
	checkId(ids=[])
	{
		if (!ids) return [];

		let state = this.store.getState();
		let { files } = state.tree.side;
		let result = [];

		files.forEach((o) => {
			if (ids.indexOf(o.id) > -1)
			{
				result.push(o.id);
			}
		});

		return result;
	}

	/**
	 * get id in item
	 *
	 * @param {String} mode
	 * @param {*} value
	 */
	getId(mode=null, value)
	{
		let state = this.store.getState();
		let { files } = state.tree.side;
		let result = [];

		switch(mode)
		{
			case 'selected':
				files.forEach((o) => {
					if (o.active)
					{
						result.push(o.id);
					}
				});
				break;
			case 'index':
				value.forEach((o) => {
					if (files[o] && files[o].id)
					{
						result.push(files[o].id);
					}
				});
				break;
			case 'all':
			default:
				files.forEach((o) => {
					result.push(o.id);
				});
				break;
		}

		return result;
	}

	// TODO : id로 index번호 가져오기
	getIndex(ids=[])
	{

	}

	/**
	 * Add files
	 *
	 * @param {Array} files
	 */
	add(files)
	{
		if (!(files instanceof Array)) return;
		this.store.dispatch(actions.side.addFiles(files));
	};

	/**
	 * Select items
	 *
	 * @param {Array} items index or id
	 * @param {String} by
	 */
	select(items=[], by='index')
	{
		let selectedId = [];

		switch(by)
		{
			case 'id':
				selectedId = this.checkId(items);
				break;

			case 'index':
			default:
				selectedId = this.getId('index', items);
				break;
		}

		//this.store.dispatch
		console.log(selectedId);
	}

	deselect(items=[], by='index') {

	}

	/**
	 * remove items
	 *
	 * @param {Array} index
	 */
	remove(index=[])
	{
		if (!index.length)
		{
			alert('No items found.');
			return;
		}

		this.store.dispatch(actions.side.removeFiles(index));
	}

	/**
	 * Clear items
	 */
	clear()
	{
		let index = this.getId('all');
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
		 * @param {Function} callbacks.complete
		 * @param {Function} callbacks.completeAll
		 * @param {Function} callbacks.fail
		 */
		if (this.uploading) return;

		const defer = $.Deferred();
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
						break;
					case 'done':
						this.store.dispatch(actions.side.updateProgress(null));
						if (!res.data) return;
						if (state.setting.base.uploadParamsConvertFunc)
						{
							let result = state.setting.base.uploadParamsConvertFunc(res.data);
							this.store.dispatch(actions.side.addFiles([result]));
							return;
						}
						else
						{
							this.store.dispatch(actions.side.addFiles([res.data.url]));
						}
						if (callbacks.complete) callbacks.complete(res.data);
						break;
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

		return defer.promise();
	}

}