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
 * @return {Promise}
 */
function makeImage()
{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 300)
	});
}

function drawBlock()
{
	return new Promise((resolve, reject) => {
		// TODO: 캔버스에 그리기
		setTimeout(() => {
			resolve();
		}, 300)
	});
}

/**
 * making image
 *
 * @param {HTMLElement} el `.ple-grid` element
 * @param {Object} data
 * @param {Object} options
 * @return {Promise}
 */
export default function makingImage(el, data={}, options={})
{
	const defer = $.Deferred(); // resolve, notify, reject
	let queues = makeQueue(el, data.grid);
	// make canvas
	let canvas = new Canvas(el.offsetWidth, el.offsetHeight, data.setting.bgColor);

	function play(queue)
	{
		// TODO: 구조 정리하기
		return new Promise((resolve, reject) => {
			makeImage().then(() => {
				drawBlock().then(() => {
					console.log(queues);
					// 큐 하나빼기
					queues.splice(0, 1);
					// 중간 경과를 알려주기
					defer.notify();
					resolve();
				});
			}, (error) => reject)
		});
	}

	function draw()
	{
		if (queues.length)
		{
			// 다음 큐 실행
			play(queues[0]).then(draw);
		}
		else
		{
			// 더이상 남아있는 큐가 없으므로 종료
			defer.resolve();
		}
	}

	// check queue
	if (!queues.length)
	{
		defer.reject('not found queue');
		return defer.promise();
	}

	// play queue
	play(queues[0]).then(draw);

	// TODO: play queue
	// TODO: draw blocks to canvas
	// TODO: export image

	return defer.promise();
}