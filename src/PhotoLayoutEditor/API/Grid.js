import * as actions from '../actions';
import * as lib from '../lib';


export default class Grid {

	constructor(store)
	{
		this.store = store;
	}

	/**
	 * get index block
	 *
	 * @param {String} mode
	 * @param {Array} index
	 * @return {Array}
	 */
	getIndex(mode=null, index=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		let result = [];

		switch(mode)
		{
			case 'selected':
				result = [];
				body.activeBlock.forEach((o) => {
					let n = lib.object.findObjectValueInArray(body.grid, 'index', o);
					if (n !== undefined) result.push(n);
				});
				return result;
			case 'value':
				result = [];
				index.forEach((o) => {
					let n = lib.object.findObjectValueInArray(body.grid, 'index', o);
					if (n !== undefined) result.push(n);
				});
				return result;
			case 'all':
			default:
				return body.grid.map((o, k) => k);
		}
	}

	/**
	 * get index block
	 *
	 * @param {String} mode
	 * @param {Array} index
	 * @return {Array}
	 */
	getBlocks(mode=null, index=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		let selected = [];

		switch(mode)
		{
			case 'selected':
				selected = this.getIndex('selected');
				break;
			case 'value':
				selected = this.getIndex('selected', index);
				break;
			case 'all':
			default:
				return body.grid;
		}

		return selected.map((o) => body.grid[o]);
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
			layout: { x: body.grid.length % body.setting.column, y: Infinity, w: 1, h: 1 },
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
	 * @param {Array} blocks
	 */
	update(blocks=[])
	{
		const state = this.store.getState();
		const { body } = state.tree;
		let result = [];
		let index = blocks.map((o) => {
			return {
				index: lib.object.findObjectValueInArray(body.grid, 'index', o.index),
				block: o
			};
		});
		index.forEach((o) => {
			result[o.index] = o.block;
		});
		this.store.dispatch(actions.body.updateBlocks(result));
	}

	remove(ids=[])
	{
		this.store.dispatch(actions.body.removeBlock(ids));
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

