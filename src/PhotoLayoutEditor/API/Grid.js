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
	 * @param {Number} key
	 * @param {String} image
	 */
	assignImage(key=null, image=null)
	{
		if (!(key !== null && image !== null)) return;
		this.store.dispatch(actions.body.attachImage(key, image));
	}

	/**
	 * remove images
	 *
	 * @param {Array} keys
	 */
	removeImages(keys=[])
	{
		const state = this.store.getState();
		let newGrid = Object.assign({}, state.tree.body.grid);
		keys.forEach(k => {
			newGrid[k].image = null;
		});
		this.update(newGrid);
	}

	/**
	 * add blocks
	 *
	 * @param {Array} blocks
	 */
	add(blocks=null)
	{
		const { getState, dispatch } = this.store;
		const state = getState();
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

		/**
		 * add block
		 *
		 * @param {Object} options
		 */
		function block(options={})
		{
			// assign option
			options = Object.assign({}, defaultOptions, options);
			options.layout = Object.assign({}, defaultOptions.layout, options.layout);
			options.image = options.image ? {
				src: options.image,
				position: '50% 50%',
				size: 'cover',
			} : null;

			dispatch(actions.body.addBlock(options));
		}

		// checking blocks
		blocks = (blocks && blocks.length) ? blocks : [null];

		// play add blocks
		blocks.forEach(o => block(o));
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

	/**
	 * remove blocks
	 *
	 * @param {Array} keys
	 */
	remove(keys=[])
	{
		this.store.dispatch(actions.body.removeBlock(keys));
	}

	/**
	 * select blocks
	 *
	 * @param {Array} keys
	 */
	select(keys=[])
	{
		keys = keys.map(k => k.toString());
		this.store.dispatch(actions.body.activeBlock(keys));
	}

	/**
	 * un select blocks
	 *
	 * @param {Array} keys
	 */
	unselect(keys=[])
	{
		const state = this.store.getState();
		let newActiveBlock = Object.assign([], state.tree.body.activeBlock);

		keys.forEach(k => {
			k = k.toString();
			if (newActiveBlock.indexOf(k) !== -1)
			{
				newActiveBlock.splice(newActiveBlock.indexOf(k), 1);
			}
		});
		this.store.dispatch(actions.body.activeBlock(newActiveBlock));
	}

	/**
	 * toggle select all blocks
	 *
	 * @param {Boolean} isSelect
	 */
	toggleSelectAll(isSelect=null)
	{
		const state = this.store.getState();

		if (typeof isSelect !== 'boolean')
		{
			isSelect = !state.tree.body.activeBlock.length;
		}
		if (isSelect)
		{
			this.select(this.getKeys('all'));
		}
		else
		{
			this.select([]);
		}
	}

	/**
	 * duplicate blocks
	 *
	 * @param {Array} keys
	 */
	duplicate(keys=[])
	{
		this.store.dispatch(actions.body.duplicateBlock(keys));
	}

	/**
	 * get preference
	 *
	 * @return {Object}
	 */
	getPreference()
	{
		const state = this.store.getState();
		return state.tree.body.setting;
	}

	/**
	 * set preference
	 *
	 * @param {Object} value
	 */
	setPreference(value={})
	{
		let newPreference = Object.assign({}, this.getPreference(), value);
		this.store.dispatch(actions.body.updateSetting(newPreference));
	}

}

