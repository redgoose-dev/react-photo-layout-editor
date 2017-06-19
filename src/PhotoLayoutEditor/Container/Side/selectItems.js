let firstSelectIdx = null;


/**
 * Change active
 *
 * @param {Object} item
 * @param {Number} start
 * @param {Number} end
 * @param {String} type press key name and select type
 * @return {Object}
 */
function changeActive(item, start, end, type)
{
	switch(type)
	{
		case 'add':
			return {
				id: item.id,
				active: (item.id === end) ? !item.active : item.active
			};
		case 'range':
			start = start || 0;
			if (start < end)
			{
				return {
					id: item.id,
					active: item.id >= start && item.id <= end
				};
			}
			else
			{
				return {
					id: item.id,
					active: item.id <= start && item.id >= end
				};
			}
			return item;
	}

	// not found type
	if (item.id === end)
	{
		return { id: item.id, active: !item.active };
	}
	else
	{
		return { id: item.id, active: false };
	}
}


/**
 * select items
 *
 * @param {Object} props
 * @param {Number} id
 * @return {Array}
 */
export default function selectItems(props, id)
{
	const { keyName } = props.keyboard;
	const { files } = props.tree.side;
	let type = null;
	let selected = false;

	if (keyName !== 'SHIFT')
	{
		let currentItem = null;
		props.tree.side.files.forEach((o) => {
			if (o.id === id)
			{
				currentItem = o;
				return false;
			}
		});
		firstSelectIdx = (currentItem.active === true) ? null : id;
		if (!firstSelectIdx && currentItem.active === true)
		{
			firstSelectIdx = currentItem.id;
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

	let items = files.map(item => {
		let obj = changeActive(item, firstSelectIdx, id, type);
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