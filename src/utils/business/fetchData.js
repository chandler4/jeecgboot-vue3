const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	// 405: "错误的Method。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};

function createInitParam(method = 'GET', data = {}) {
	method = method.toUpperCase();
	for (let key in data) {
		if (data[key] instanceof Blob) {
			data = global.objectToFormData(data);
			method = 'POST';
			break;
		}
	}

	let contentType = 'application/json; charset=utf-8';
	let body;
	if (data instanceof FormData) {
		contentType = 'multipart/form-data';
		body = data;
	} else {
		body = JSON.stringify(data);
	}

	if (method === 'GET') {
		body = null;
	}

	return {
		method, // GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, same-origin
		cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, same-origin, omit
		headers: {
			'Content-Type': contentType,
		},
		redirect: 'follow', // manual, follow, error
		referrerPolicy: 'no-referrer', // no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body, // body data type must match "Content-Type" header
	}
}

function jsonResponse(response, config) {
	if (!response.ok) {
		return;
	}
	return response.json().then(data => {
		if (data?.code === 1) {
			return data?.data;
		}
		console.error('业务逻辑错误', data);
		if (config.throwError) {
			throw new Error(data);
		}
	});
}

const lastMsgMap = {};

export default async function fetchData(url = '', data = {}, config = {}) {
	const initParam = createInitParam(config.method, data);
	return fetch(url, initParam).then(response => {
		if (!response.ok) {
			const currentMsg = codeMessage[response.status] || '网络错误';
			const currentTime = Date.now();
			if (!config.noErrMsg) {
				if (!lastMsgMap[currentMsg] || currentTime - lastMsgMap[currentMsg] >= 5000) {
					lastMsgMap[currentMsg] = currentTime;
					message.error(currentMsg);
				}
			}
			if (response.status === '401') {
				//login
			}
			config.onError && config.onError(response);
			if (config.throwError) {
				return Promise.reject(response);
			}
		}
		return response;
	}).catch(error => {
		console.error('fetchData错误', error);
		if (config.throwError) {
			throw new Error(error);
		}
		return error;
	});
}

export async function httpGet(url = '', data = {}, config = {}) {
	config = {
		...config,
		method: 'GET',
	};

	let params = new URLSearchParams();
	for (let key in data) {
		params.append(key, data[key]);
	}

	if (Array.from(params.keys()).length) {
		url = `${url}${url.includes('?') ? '&' : '?'}${params}`;
	}
	const response = await fetchData(url, {}, config);
	const result = await jsonResponse(response, config);
	return result;
}

export async function httpPost(url, data, config) {
	config = {
		...config,
		method: 'POST',
	};
	const response = await fetchData(url, data, config);
	const result = await jsonResponse(response, config);
	return result;
}

export async function httpPUT(url, data, config) {
	config = {
		...config,
		method: 'PUT',
	};
	const response = await fetchData(url, data, config);
	const result = await jsonResponse(response, config);
	return result;
}


export async function httpDelete(url, data, config) {
	config = {
		...config,
		method: 'DELETE',
	};
	const response = await fetchData(url, data, config);
	const result = await jsonResponse(response, config);
	return result;
}

export async function httpExport(url, data, config) {

}
