
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
			bgColor: 'rgba(255,255,255,1)',
		},
		blockColor: 'rgba(211,211,211,1)',
		grid: {},
	},
	side: {
		files: [],
		visible: true,
		progressPercent: null,
	},

};


export const side = {
	files: {},
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