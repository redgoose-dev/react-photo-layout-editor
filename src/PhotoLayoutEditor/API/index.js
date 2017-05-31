import Side from './Side';


let store = null;


export default {

	init: (getStore) => {
		store = getStore;
	},

	checkStore: () => {
		console.log('check state:', store);
	},

	getStore: () => {
		return store;
	},

	side: new Side(store),

};