import axios from 'axios';

const handleResposne = (res, resolve, reject) => {
    if ((res.response_code && res.response_code === '00') || (res.success && res.success === 'SUCCESS')) {
        resolve(res.content || res.data)
    } else {
        if (res.response_code) {
            reject({ code: res.response_code, message: res.response_msg })
        } else {
            reject(res.error)
        }
    }
}

const handleError = (err, reject) => {
    console.log(err)
    reject({ code: 'NET_ERROR', message: '网络错误' })
}

export const get = (url, params) => new Promise((resolve, reject) => {
    if (params) {
        const paramsArray = [];
        // 拼接参数
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
        if (paramsArray.length > 0) {
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        }
    }
    axios(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'zh-CN',
        },
    })
        .then(response => response.data)
        .then(res => handleResposne(res, resolve, reject))
        .catch(err => handleError(err, reject));
})

export const post = (url, jsonData) => new Promise((resolve, reject) => {
    axios(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'zh-CN',
        },
        data: jsonData,
    })
        .then(response => response.data)
        .then(res => handleResposne(res, resolve, reject))
        .catch(err => handleError(err, reject));
})

export const form = (url, formData) => new Promise((resolve, reject) => {
    axios(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Accept-Language': 'zh-CN',
        },
        data: formData,
    })
        .then(response => response.data)
        .then(res => handleResposne(res, resolve, reject))
        .catch(err => handleError(err, reject));
})