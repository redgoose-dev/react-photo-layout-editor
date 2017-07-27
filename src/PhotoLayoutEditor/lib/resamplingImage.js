import * as lib from './';

// default options
const defaultOptions = {
	image: null,
	width: 100,
	height: 100,
	reSampleCount: 1,
	bgColor: 'rgba(255,255,255,1)',
	cw: 0,
	ch: 0,
	cx: 0,
	cy: 0,
	dw: 0,
	dh: 0,
	dx: 0,
	dy: 0,
};


/**
 * resize
 *
 * @param {Object} options
 * @param {Number} count
 * @param {Canvas} parentCanvas
 * @return {Promise}
 */
function resize(options, count, parentCanvas)
{
	return new Promise(resolve => {
		function func(count, parentCanvas)
		{
			const max = Math.pow(2, count);
			let canvasForResize = new lib.Canvas(
				options.width * max,
				options.height * max,
				options.bgColor
			);

			canvasForResize.ctx.drawImage(
				parentCanvas.el,
				0,
				0,
				parentCanvas.el.width * 0.5,
				parentCanvas.el.height * 0.5
			);

			if (count > 0)
			{
				func(count - 1, canvasForResize);
			}
			else
			{
				resolve(canvasForResize);
			}
		}

		func(count - 1, parentCanvas);
	});
}


/**
 * resampling image
 *
 * @param {Object} options
 * @return {Promise}
 */
export default function resamplingImage(options)
{
	// assign options
	options = Object.assign({}, defaultOptions, options);

	return new Promise((resolve, reject) => {
		if (!options.image) reject('not found image');

		// set reSample count
		options.reSampleCount = Math.min(4, options.reSampleCount);
		options.reSampleCount = Math.max(0, options.reSampleCount);
		const reSampleMax = Math.pow(2, options.reSampleCount);

		// set canvas
		const canvas = new lib.Canvas(
			options.width * reSampleMax,
			options.height * reSampleMax,
			options.bgColor
		);

		canvas.ctx.drawImage(
			options.image,
			options.cx, // cx
			options.cy, // cy
			options.cw, // cw
			options.ch, // ch
			options.dx * reSampleMax, // dx
			options.dy * reSampleMax, // dy
			options.dw * reSampleMax, // dw
			options.dh * reSampleMax, // dh
		);

		if (options.reSampleCount > 0)
		{
			resize(options, options.reSampleCount, canvas).then(resolve);
		}
		else
		{
			resolve(canvas);
		}
	});

}