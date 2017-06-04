/**
 * Shuffles array in place.
 *
 * @param {Array} input items The array containing the items.
 * @return {Array}
 */
export function shuffle(input)
{
	for (let i = input.length-1; i >=0; i--)
	{
		const randomIndex = Math.floor(Math.random()*(i+1));
		const itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}

/**
 * Find object value in array
 *
 * @param {Array} array
 * @param {String} key
 * @param {Number|String} value
 * @return {Number}
 */
export function findObjectValueInArray(array=[], key='index', value=null)
{
	for (let i = 0; i < array.length; i++)
	{
		if (array[i][key] === value) return i;
	}
}

/**
 * is array
 *
 * @param {Array} arr
 * @return {Boolean}
 */
export function isArray(arr=[])
{
	return !!(arr && arr.length);
}