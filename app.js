var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'https://gateway.open.hifiveai.com';
app.all("/*", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X-HF-Action, X-HF-Version, X-HF-AppId, X-HF-Timestamp, X-HF-Nonce, X-HF-ClientId, X-HF-Token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.method == 'OPTIONS'){
    res.send(200);
  } else {
    apiProxy.web(req, res, {
      target: serverOne,
      changeOrigin: true
    });
  }
});
app.listen(8090);