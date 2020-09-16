import axios from 'axios';

const handleResposne = (res, resolve, reject) => {
    if ((res.responseCode && res.responseCode === '_200')) {
        resolve(res)
    } else {
        if (res.responseCode) {
            reject(res)
        } else {
            reject(res.error)
        }
    }
}

const handleError = (err, reject) => {
    console.log(err)
    reject({ code: 'NET_ERROR', message: '网络错误' })
}

export const get = (url, params, data) => new Promise((resolve, reject) => {
    if (params&&data) {
        console.log(data)
        axios(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'zh-CN',
            },
            params: params,
            data: data
        })
            .then(response => response.data)
            .then(res => handleResposne(res, resolve, reject))
            .catch(err => handleError(err, reject));
    }
    if (params&&!data) {
        axios(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'zh-CN',
            },
            params: params
        })
            .then(response => response.data)
            .then(res => handleResposne(res, resolve, reject))
            .catch(err => handleError(err, reject));
    }
    else {
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
    }
    
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

export const postQuery = (url, queryData) => new Promise((resolve, reject) => {
    axios(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'zh-CN',
        },
        params: queryData,
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