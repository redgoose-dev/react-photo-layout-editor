import $ from 'jquery/dist/jquery.slim';


/**
 * local upload
 *
 * @param {File} file
 * @return {Promise}
 */
function local(file)
{
	const defer = $.Deferred();
	const reader = new FileReader();

	reader.addEventListener('load', function(e) {
		defer.resolve(e.target.result);
	});
	reader.addEventListener('error', function(e) {
		defer.reject(e.target);
	});

	reader.readAsDataURL(file);

	return defer.promise();
}

/**
 * external upload
 *
 * @param {String} script
 * @param {File} file
 * @return {Promise}
 */
function external(script, file)
{
	const defer = $.Deferred();
	const xhr = new XMLHttpRequest();

	if (!(typeof FormData === 'function' || typeof FormData === 'object'))
	{
		defer.reject('not support browser', file);
		return null;
	}
	const formData = new FormData();

	function onLoad(e)
	{
		try {
			const result = JSON.parse(e.target.responseText);
			if (result.state === 'success')
			{
				defer.resolve(result.data);
			}
			else
			{
				throw 'server error';
			}
		} catch(e) {
			defer.reject(e);
		}
	}

	function onProgress(event)
	{
		const { loaded, total } = event;
		defer.notify('progress', loaded, total);
	}

	formData.append('files[]', file);
	xhr.open('post', script, true);

	xhr.addEventListener('load', onLoad);
	xhr.upload.addEventListener('progress', onProgress);

	xhr.send(formData);

	// start queue
	defer.notify('start');

	return defer.promise();
}


/**
 * upload multiple files
 *
 */
export default function uploader(files, script)
{
	const defer = $.Deferred();
	const total = files.length;
	let count = 0;

	function upload()
	{
		if (count >= total)
		{
			defer.resolve();
			return;
		}

		if (script)
		{
			external(script, files[count])
				.done((data) => {
					defer.notify('done', { count, data });
					count++;
					upload();
				})
				.progress((state, loaded, total) => {
					defer.notify(
						state,
						state === 'progress' && { loaded, total },
					);
				})
				.fail((error) => {
					defer.reject(error);
				});
		}
		else
		{
			local(files[count])
				.done((src) => {
					defer.notify('done', { count, src });
					count++;
					upload();
				})
				.fail(() => {});
		}
	}

	upload(0);

	return defer.promise();
}