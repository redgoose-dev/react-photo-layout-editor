let firstSelectIdx = null;


/**
 * Change active
 *
 * @param {Number} key
 * @param {Object} item
 * @param {Number} start
 * @param {Number} end
 * @param {String} type press key name and select type
 * @return {Object}
 */
function changeActive(key, item, start, end, type)
{
	switch(type)
	{
		case 'add':
			return {
				key: key,
				active: (key === end) ? !item.active : item.active
			};
		case 'range':
			start = start || 0;
			if (start < end)
			{
				return {
					key: key,
					active: key >= start && key <= end
				};
			}
			else
			{
				return {
					key: key,
					active: key <= start && key >= end
				};
			}
			return item;
	}

	// not found type
	if (key === end)
	{
		return { key: key, active: !item.active };
	}
	else
	{
		return { key: key, active: false };
	}
}


/**
 * select items
 *
 * @param {Object} props
 * @param {Number} key
 * @return {Array}
 */
export default function selectItems(props, key)
{
	const { keyName } = props.keyboard;
	const { files } = props.tree.side;
	let type = null;
	let selected = false;

	if (keyName !== 'SHIFT')
	{
		let currentItem = null;
		Object.keys(props.tree.side.files).forEach(k => {
			let obj = props.tree.side.files[k];
			if (parseInt(k) === key)
			{
				currentItem = obj;
				return false;
			}
		});
		firstSelectIdx = (currentItem.active === true) ? null : key;
		if (!firstSelectIdx && currentItem.active === true)
		{
			firstSelectIdx = currentItem.key;
		}
	}

	switch (keyName) {
		case 'CTRL':
		case 'CMD':
			type = 'add';
			break;
		case 'SHIFT':
			type = 'range';
	}

	let items = Object.keys(files).map(k => {
		let obj = changeActive(parseInt(k), files[k], firstSelectIdx, key, type);
		if (obj.active)
		{
			selected = true;
		}
		return obj;
	});

	if (!selected)
	{
		firstSelectIdx = null;
	}

	return items;
}