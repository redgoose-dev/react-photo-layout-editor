import * as actions from '../actions';


export default class Layout {

	constructor(store)
	{
		this.store = store;
	}

	/**
	 * Toggle side
	 *
	 * @param {Boolean|undefined} sw
	 */
	toggleSide(sw)
	{
		try {
			const currentSw = this.store.getState().tree.side.visible;
			const targetSw = (typeof sw === 'undefined') ? !currentSw : sw;

			this.store.dispatch(actions.side.visible(targetSw));
		} catch(e) {
			console.warn('Error action', e)
		}
	};

}