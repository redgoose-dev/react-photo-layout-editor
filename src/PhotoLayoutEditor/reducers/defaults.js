
export const setting = {

	base: {
		uploadScript: null,
		uploadParamsConvertFunc: null,
	},
	body: {
		setting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
		},
		blockColor: '#ddd',
		grid: [
			{ layout: { x: 0, y: 0, w: 2, h: 2 } },
			{ layout: { x: 2, y: 0, w: 1, h: 2 } },
			{ layout: { x: 3, y: 0, w: 2, h: 1 } },
			{ layout: { x: 3, y: 1, w: 1, h: 1 } },
		],
	},
	side: {
		files: [],
		visible: true,
		progressPercent: null,
	},

};


export const side = {
	files: [],
	visible: true,
	progressPercent: null,
};


export const body = {
	visibleToolbarButtons: {
		setting: true,
		shuffle: true,
		add: true,
		select: true,
		edit: false,
		removeImage: false,
		duplicate: false,
		removeBlock: false,
		editColor: false,
	}
};