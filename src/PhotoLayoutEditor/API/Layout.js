import * as actions from '../actions';


export default function Layout(store) {

	/**
	 * Toggle side
	 *
	 * @param {Boolean|undefined} sw
	 */
	this.toggleSide = function(sw)
	{
		try {
			const currentSw = store.getState().tree.side.visible;
			const targetSw = (typeof sw === 'undefined') ? !currentSw : sw;

			store.dispatch(actions.side.visible(targetSw));
		} catch(e) {
			console.warn('Error action', e)
		}
	}

}