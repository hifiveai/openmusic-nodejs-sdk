'use strict';
const CryptoJS = require('crypto-js')
const { Base64 } = require('js-base64')

class ClientBase {
  constructor(config) {
    if (!config) {
      throw new Error('config must be passed in')
    }
    const url = config.Host
    const appId = config.AppId
    const serverCode = config.ServerCode
    const version = config.Version
    if (!url) {
      throw new Error('config.url must be passed in, please see https://account.hifiveai.com/api/method/callMode to chose one');
    }
    if (!appId) {
      throw new Error('config.appId must be passed in, please see https://account.hifiveai.com/api/method/sign');
    }
    if (!serverCode) {
      throw new Error('config.serverCode must be passed in, please see https://account.hifiveai.com/api/method/sign');
    }
    if (!version) {
      throw new Error('config.version must be passed in, it is should be your userId');
    }
    this.__appId = appId
    this.__serverCode = serverCode
    this.__version = version
  }

  __randomWord (randomFlag, min, max) {
    let str = ""
    let range = min
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min
    }
    for(var i=0; i<range; i++){
      let pos = Math.round(Math.random() * (arr.length-1))
      str += arr[pos]
    }
    return str
  }
  __getSignatureV3 (action, method, params, clientId, token) {
    let headers = {
      'X-HF-Action': action,
      'X-HF-Version': this.__version,
      'X-HF-AppId': this.__appId,
      'X-HF-Timestamp': new Date().getTime(),
      'X-HF-Nonce': this.__randomWord(false, 32),
      'X-HF-ClientId': clientId,
      'X-HF-Token': token
    }
// 规范化的请求字符串
    let _params = ''
    let j = 0
    let array = []
    for (let i in params) {
      array.push(i)
    }
    let _array = array.sort()
    for (let i in _array) {
      const key = _array[i]
      if (params[key] === '') continue
      _params += (j === 0 ? '' : '&') + key + '=' + (params[key] instanceof Object ? JSON.stringify(params[key]) : params[key])
      j++
    }
    // 拼接请求类型和公共参数
    const _publicParams = method + ' ' + headers['X-HF-Action'] + ' ' + headers['X-HF-Version'] + ' ' + headers['X-HF-AppId'] + ' ' + headers['X-HF-Nonce'] + ' ' + headers['X-HF-ClientId'] + ' ' + 'HF3-HMAC-SHA1' + ' ' + headers['X-HF-Timestamp']
    const _base = _params === '' ? Base64.encode(Base64.encode(_publicParams)) : Base64.encode(_params + '&' + Base64.encode(_publicParams))
    const hash = CryptoJS.HmacSHA1(_base, this.__serverCode)
    const _md5 = CryptoJS.MD5(hash).toString(CryptoJS.enc.Hex).toUpperCase()
    headers.Authorization = 'HF3-HMAC-SHA1 Signature=' + _md5
    return headers
  }
}

module.exports = ClientBase;