import * as actions from '../actions';


export default function Side(store) {

	/**
	 * Add files
	 *
	 * @param {Array} files
	 */
	this.add = function(files)
	{
		if (!(files instanceof Array)) return;

		store.dispatch(actions.side.addFiles(files));
	}

}