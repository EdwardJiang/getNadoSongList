const request = require('request');
/* 封装request方法 */
module.exports =  function getRequest(_url, callback){
  let timestamp = new Date().getTime();
  var requestUrl = '';
  // 组装最终的url
  if(_url.indexOf('?') !== -1){
    requestUrl = _url + '&timestamp=' + timestamp;
  } else{
    requestUrl = _url + '?timestamp=' + timestamp;
  }

  request(requestUrl, function (err, result) {
    if (err) {
      console.log('获取数据时失败：' + err);
      return;
    }
    // console.log(result.body);
    callback(result);
  });
}