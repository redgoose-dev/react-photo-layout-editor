export function pickImages(count=3)
{
	const sampleImages = [
		'http://goose.redgoose.me/data/upload/original/201501/a93e9f2c844c4e8d6a80c89c9e3840ec.jpg',
		'http://goose.redgoose.me/data/upload/original/201703/rg-20170306-000104.jpg',
		'http://goose.redgoose.me/data/upload/original/201703/rg-20170110-000094.jpg',
		'http://goose.redgoose.me/data/upload/original/201611/junk_20161108-1.jpg',
		'http://goose.redgoose.me/data/upload/original/201610/rg3839.jpg',
		'http://goose.redgoose.me/data/upload/original/201701/20161120_000.jpg',
		'http://goose.redgoose.me/data/upload/original/201511/rg3612.jpg',
		'http://goose.redgoose.me/data/upload/original/201508/rg3396.jpg',
		'http://goose.redgoose.me/data/upload/original/201503/cdb2f4958151df4c96af89f5d2e829a9.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/a89cf80d5ed1aa61a1c99a2c22268c53.jpg',
		'http://goose.redgoose.me/data/upload/original/201503/ce88b697650b8cba1c11d1abc2976263.jpg',
		'http://goose.redgoose.me/data/upload/original/201507/rg3304.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/3487d4a6a73ed3419ef3052f3522d5b0.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/f6d98ae06d771a043817f897e22b54c6.jpg',
		'http://goose.redgoose.me/data/upload/original/201311/8714a22520793021e1765b74090ed857.jpg',
		'http://goose.redgoose.me/data/upload/original/201212/scripter2156.jpg',
	];
	let images = Object.assign([], sampleImages);
	let result = [];

	(function get() {
		if (count <= 0) return;
		result.push(images.splice(Math.floor(Math.random() * images.length), 1)[0]);
		count--;
		get();
		if (count >= 1) get();
	})();

	return result;
}