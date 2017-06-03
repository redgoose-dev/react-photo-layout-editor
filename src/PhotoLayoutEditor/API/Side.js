import $ from 'jquery/dist/jquery.slim';

import * as actions from '../actions';
import * as lib from '../lib';


export default function Side(store) {

	this.uploading = false;

	/**
	 * Add files
	 *
	 * @param {Array} files
	 */
	this.add = function(files)
	{
		if (!(files instanceof Array)) return;

		store.dispatch(actions.side.addFiles(files));
	};

	/**
	 * Upload files
	 *
	 * @param {FileList} files
	 * @param {Object} callbacks
	 */
	this.upload = function(files, callbacks={})
	{
		/**
		 * @param {Function} callbacks.start
		 * @param {Function} callbacks.complete
		 * @param {Function} callbacks.completeAll
		 * @param {Function} callbacks.fail
		 */
		if (this.uploading) return;

		const defer = $.Deferred();
		const state = store.getState();
		this.uploading = true;

		if (callbacks.start) callbacks.start();

		lib.uploader(files, state.setting.base.uploadScript)
			.progress((type, res) => {
				switch(type)
				{
					case 'start':
						store.dispatch(actions.side.updateProgress(0));
						break;
					case 'progress':
						const percent = parseInt((res.loaded / res.total * 100));
						store.dispatch(actions.side.updateProgress(percent));
						break;
					case 'done':
						store.dispatch(actions.side.updateProgress(null));
						if (!res.data) return;
						if (state.setting.base.uploadParamsConvertFunc)
						{
							let result = state.setting.base.uploadParamsConvertFunc(res.data);
							store.dispatch(actions.side.addFiles([result]));
							return;
						}
						else
						{
							store.dispatch(actions.side.addFiles([res.data.url]));
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