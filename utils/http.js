const baseUrl = 'http://www.shsninfo.com:1238';
const request = (opts) => {
	// #ifdef H5
	const url = process.env.NODE_ENV === 'development' ? `/api${opts.url}` : baseUrl + opts.url;
	// #endif
	// #ifdef APP-PLUS || MP
	url = baseUrl + opts.url;
	// #endif
	const token = uni.getStorageSync('user_info')?.token;
	var httpDefaultOpts = {
		url: url,
		data: opts.data,
		beforeSend: function(xmlHttp) {
			xmlHttp.setRequestHeader("If-Modified-Since", "0");
			xmlHttp.setRequestHeader("Cache-Control", "no-cache");
		},
		method: opts.method,
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			"token": token,
		} : {
			// 'content-type': 'application/x-www-form-urlencoded',
			'content-type': 'application/json; charset=UTF-8',
			"token": token,
		},
		dataType: 'json',
	}
	var promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1]);
			}
		).catch(
			(response) => {
				reject(response);
			}
		)
	})
	return promise
};
export default request;
