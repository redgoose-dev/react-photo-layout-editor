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
			console.log('>> make image');
			resolve();
		}, 300)
	});
}

/**
 * draw block
 * 캔버스에다가 블럭을 그려준다.
 *
 * @param {Canvas} canvas
 */
function drawBlock(canvas)
{
	return new Promise((resolve, reject) => {
		// TODO: 캔버스에 그리기
		setTimeout(() => {
			console.log('>> draw block');
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
	/**
	 * TODO: 동작과정
	 * - make queue
	 * - make canvas
	 * - queue play
	 * - make block image
	 * - draw block
	 * - end (make image from canvas)
	 */

	const defer = $.Deferred(); // resolve, notify, reject
	let queues = makeQueue(el, data.grid);
	// make canvas
	let canvas = new Canvas(el.offsetWidth, el.offsetHeight, data.setting.bgColor);

	/**
	 * play
	 * 큐 플레이. 이미지를 만들고 캔버스에 그리고나서 결과는 `confirm`에서 받는다.
	 *
	 * @param {Object} queue
	 * @return {Promise}
	 */
	function play(queue)
	{
		// TODO: 구조 정리하기
		return new Promise((resolve, reject) => {
			makeImage().then(drawBlock(canvas).then(resolve, reject), reject);
		});
	}

	/**
	 * confirm
	 * 큐를 하나 삭제하고 계속 `play`함수를 실행할지 종료할지 결정한다.
	 */
	function confirm()
	{
		// 큐 하나빼기
		queues.splice(0, 1);

		// 중간 경과를 알려주기
		defer.notify();

		if (queues.length)
		{
			play(queues[0]).then(confirm, error);
		}
		else
		{
			end();
		}
	}

	/**
	 * error
	 *
	 * @param {String} err
	 */
	function error(err)
	{
		defer.reject(err);
	}

	/**
	 * end
	 * `play`가 모두 끝났을때 호출. `done`으로 내보낸다.
	 */
	function end()
	{
		// 더이상 남아있는 큐가 없으므로 종료
		defer.resolve();
	}

	// check queue
	if (queues.length)
	{
		// play queue
		play(queues[0]).then(confirm, error);
	}
	else
	{
		// not found queues
		error('not found queue');
	}

	return defer.promise();
}