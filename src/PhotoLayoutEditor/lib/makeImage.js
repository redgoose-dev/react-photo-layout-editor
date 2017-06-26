import $ from 'jquery/dist/jquery.slim';


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

function exportGrid(el, grid)
{
	const $items = $(el).children();
	let result = [];

	$items.each((key, item) => {
		let $item = $(item);
		result.push({
			key: $item.data('key'),
			x: $item.position().left,
			y: $item.position().top,
			width: $item.width(),
			height: $item.height(),
			image: grid[$item.data('key')].image
		});
	});

	return result;
}

// function makeQueue(grid=null, setting=null)
// {
// 	if (!(grid && setting)) return null;
//
// 	let queue = [];
//
// 	function getItemSize(width, col, margin)
// 	{
// 		return (width * col) + ((col > 1) ? margin * (col - 1) : 0);
// 	}
//
// 	Object.keys(grid).forEach(k => {
// 		let block = grid[k];
//
// 		queue.push({
// 			image: block.image || {},
// 		});
// 		console.log(block);
// 	});
// }


/**
 * make image
 *
 * @param {HTMLElement} el `.ple-grid` element
 * @param {Object} data
 * @param {Object} option
 * @param {Function} callback
 */
export default function makeImage(el, data={}, option={}, callback=null)
{
	// TODO: exportGrid 해야함.
	// TODO: 이유는 엘리먼트에서 값을(size, position) 추출해내는게 편한거 같음
	const grid = exportGrid(el, data.grid);
	console.log(grid);

	// set queue
	//let queue = makeQueue(data.grid, data.setting);
	// set canvas
	let canvas = new Canvas(el.offsetWidth, el.offsetHeight, data.setting.bgColor);

	// TODO: test
	let _output = document.getElementById('makeImageArea');
	_output.innerHTML = '';
	_output.appendChild(canvas.el);
}