import $ from 'jquery/dist/jquery.slim';

import * as libs from '../lib';


export default class Keyboard {

	constructor()
	{
		this.eventName = `PLE_${libs.number.getTimeStamp()}`;
		this.code = null;
		this.keyName = null;
		this.names = {
			17: 'CTRL',
			18: 'ALT',
			91: 'CMD',
			93: 'CMD',
			16: 'SHIFT',
		};

		// init key down event
		$(window).on(`keydown.${this.eventName}`, this._keyDown.bind(this));
	}

	/**
	 * apply
	 *
	 * @param {Number} code
	 */
	apply(code)
	{
		this.code = code;
		this.keyName = this.names[this.code] || null;
	}

	/**
	 * key down event
	 *
	 * @param {Event} e
	 */
	_keyDown(e)
	{
		// apply keyCode
		this.apply(e.keyCode);

		// set events
		$(window)
			.on(`keyup.${this.eventName}`, this._keyUp.bind(this))
			.on(`contextmenu.${this.eventName}`, this._keyUp.bind(this))
			.on(`blur.${this.eventName}`, this._keyUp.bind(this))
			.off(`keydown.${this.eventName}`);
	}

	/**
	 * key up event
	 *
	 */
	_keyUp()
	{
		// apply keyCode
		this.apply(null);

		// set events
		$(window)
			.on(`keydown.${this.eventName}`, this._keyDown.bind(this))
			.off(`contextmenu.${this.eventName} keyup.${this.eventName} blur.${this.eventName}`);
	}

	/**
	 * destroy event
	 *
	 */
	destroy()
	{
		$(window).off(`keydown.${this.eventName} contextmenu.${this.eventName} keyup.${this.eventName} blur.${this.eventName}`);
	}

}