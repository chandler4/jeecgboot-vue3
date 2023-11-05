const config = {
  method: 'get',
  // 基础url前缀
  // 请求头信息
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000 * 10,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}


const customFetch = (url = '', option) => {
  let mergeOption = {
    headers: config.headers,
    timeout: config.timeout,
    ...option
  };

	const data = mergeOption.data || {};;
	if (mergeOption.method?.toLocaleLowerCase() === 'get') {
		const keys = Object.keys(data);
		if (keys.length) {
			const searchParams = new URLSearchParams();
			keys.forEach(key => {
				searchParams.append(key, data[key]);
			});
			url += (url.includes('?') ? '&' : '?');
			url += searchParams;
		}		
	}
	
	if (data instanceof FormData) {
		mergeOption.headers['Content-Type'] = 'multipart/form-data';
	}
	
	// console.log(url);

  return new Promise((resolve, reject) => {
    fetch(url, mergeOption)
      .then(res=>{
        if (res?.status === 200) {
            return res.json();
        } else{
          //permission
        }
      })
      .then(res=>{
        console.log('res: ' + res);
        if (res?.code === 1) {
          resolve(res.data);
        } else {
          let error = {message: '后端请求错误'};
          if (res.message) error.message = res.message;
          reject(error);
        }
      })
      .catch(error => {
        reject(error);
      })
  });
}

export default customFetch;
