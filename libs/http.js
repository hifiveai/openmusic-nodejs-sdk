const URL = require('url');
const http = require('http');
const https = require('https');
const querystring = require('querystring');
const Request = function (config) {
  let url = config.host
  let content = ''
  for (let i in config.params) {
    if (config.params[i] instanceof Object) {
      config.params[i] = JSON.stringify(config.params[i])
    }
  }
  if (config.method === 'GET') {
    let _params = ''
    let j = 0
    let array = []
    for (let i in config.params) {
      _params += (j === 0 ? '' : '&') + i + '=' + config.params[i]
      j++
    }
    url = config.host + '?' + _params
  } else {
    content = querystring.stringify(config.params)
  }
  let urlObj = URL.parse(url);
  let protocol = urlObj.protocol;
  let options = {
    hostname: urlObj.hostname,
    port: urlObj.port,
    path: urlObj.path,
    method: config.method,
    headers: config.method === 'POST' ? Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, config.header) : config.header
  };
  return new Promise((resolve, reject) => {
    let req = (protocol == 'http:' ? http : https).request(options, function (res) {
      if (res.statusCode !== 200) {
        reject(res);
      } else {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          resolve(JSON.parse(chunk))
        });
        res.on('end', function () {
        });
      }
    });
    req.on('error', (e) => {
      reject(e);
    });
    if (config.method === 'POST') req.write(content);
    req.end();
  })
}
module.exports = Request;