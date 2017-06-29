/**
 * Canvas
 */
export default class Canvas {

	/**
	 * constructor
	 *
	 * @param {Number} width
	 * @param {Number} height
	 * @param {String} bgColor
	 */
	constructor(width=150, height=100, bgColor='#ffffff')
	{
		this.el = document.createElement('canvas');
		this.ctx = this.el.getContext('2d');

		this.el.width = width;
		this.el.height = height;

		this.ctx.fillStyle = bgColor;
		this.ctx.fillRect(0, 0, width, height);
	}

}