import $ from 'jquery/dist/jquery.slim';

import * as lib from './index';


/**
 * Canvas
 *
 * @param {Number} width
 * @param {Number} height
 * @param {String} bgColor
 */
function Canvas(width=150, height=100, bgColor='#ffffff')
{
	this.el = document.createElement('canvas');
	this.ctx = this.el.getContext('2d');

	this.el.width = width;
	this.el.height = height;

	this.ctx.fillStyle = bgColor;
	this.ctx.fillRect(0, 0, width, height);
}

/**
 * export grid
 *
 * @param {HTMLElement} el
 * @param {Array} grids
 * @return {Array}
 */
function makeQueue(el, grids)
{
	if (!(el && grids)) return null;

	const $items = $(el).children();
	let result = [];

	$items.each((key, item) => {
		const $item = $(item);
		const grid = grids[$item.data('key')];
		let image = grid.image;

		if (image)
		{
			image = {
				src: image.src,
				position: image.position.split(' '),
				size: image.size === 'cover' ? null : image.size.split(' ')
			};
		}

		result.push({
			key: $item.data('key'),
			x: $item.position().left,
			y: $item.position().top,
			width: $item.width(),
			height: $item.height(),
			image: image || null,
			color: grid.color,
		});
	});

	return result;
}


/**
 * make image
 *
 * @param {HTMLElement} el `.ple-grid` element
 * @param {Object} data
 * @param {Object} options
 * @param {Function} callback
 */
export default function makeImage(el, data={}, options={}, callback=null)
{
	// set queue
	const queue = makeQueue(el, data.grid);

	// make canvas
	let canvas = new Canvas(el.offsetWidth, el.offsetHeight, data.setting.bgColor);

	// TODO: play queue
	// TODO: draw blocks to canvas
	// TODO: export image


	// TODO: test
	let _output = document.getElementById('makeImageArea');
	_output.innerHTML = '';
	_output.appendChild(canvas.el);
}