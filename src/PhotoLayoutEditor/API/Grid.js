import * as actions from '../actions';
import * as lib from '../lib';


export default class Grid {

	constructor(store)
	{
		this.store = store;
	}

	/**
	 * get keys in block
	 *
	 * @param {String} mode
	 * @param {Array} keys
	 * @return {Array}
	 */
	getKeys(mode=null, keys=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		let result = [];

		switch(mode)
		{
			case 'selected':
				return body.activeBlock;
			case 'value':
				result = [];
				keys.forEach((k) => {
					if (body.grid[k])
					{
						result.push(k);
					}
				});
				return result;
			case 'all':
			default:
				return Object.keys(body.grid).map(k => k);
		}
	}

	/**
	 * get blocks
	 *
	 * @param {String} mode
	 * @param {Array} keys
	 * @return {Object}
	 */
	getBlocks(mode=null, keys=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		let selected = [];
		let result = {};

		switch(mode)
		{
			case 'selected':
				selected = this.getKeys('selected');
				break;
			case 'value':
				selected = this.getKeys('value', keys);
				break;
			case 'all':
			default:
				return body.grid;
		}

		selected.forEach(k => {
			if (!body.grid[k]) return;
			result[k] = body.grid[k];
		});

		return result;
	}

	/**
	 * shuffle items
	 *
	 * @param {Object} options
	 */
	shuffle(options={})
	{
		const state = this.store.getState();
		const { body } = state.tree;
		const defaultOptions = { x: body.setting.column, y: 2, w: 2, h: 2 };

		// assign options
		options = Object.assign({}, defaultOptions, options);

		this.store.dispatch(actions.body.shuffleBlocks(options));
	}

	/**
	 * assign image
	 *
	 * @param {Array} images
	 */
	assignImages(images=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;

		this.store.dispatch(actions.body.attachImages(
			images,
			body.setting.column,
			body.activeBlock
		));
	}

	/**
	 * assign image
	 *
	 * @param {Number} id
	 * @param {String} image
	 */
	assignImage(id=null, image=null)
	{
		if (!(id !== null && image !== null)) return;
		this.store.dispatch(actions.body.attachImage(id, image));
	}

	/**
	 * add blocks
	 *
	 * @param {Object} options
	 */
	add(options={})
	{
		const state = this.store.getState();
		const { body } = state.tree;
		const defaultOptions = {
			layout: {
				x: Object.keys(body.grid).length % body.setting.column,
				y: Infinity,
				w: 1,
				h: 1
			},
			color: null,
			image: null
		};

		// assign option
		options = Object.assign({}, defaultOptions, options);
		options.layout = Object.assign({}, defaultOptions.layout, options.layout);
		options.image = options.image ? {
			src: options.image,
			position: '50% 50%',
			size: 'cover',
		} : null;

		this.store.dispatch(actions.body.addBlock(options));
	}

	/**
	 * update blocks
	 *
	 * @param {Object} blocks
	 */
	update(blocks={})
	{
		this.store.dispatch(actions.body.updateBlocks(blocks));
	}

	remove(keys=[])
	{
		this.store.dispatch(actions.body.removeBlock(keys));
	}

	duplicate()
	{

	}

	select()
	{

	}

	unselect()
	{

	}

	toggleSelect()
	{

	}

	getPreference()
	{

	}

	setPreference()
	{

	}

	export()
	{

	}
}

