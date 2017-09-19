// 真简易ajax 回调版
function w_ajax(options, callback) {
  let url = options.url || '';
  let method = options.method || 'GET';
  let data = options.data || null;
  let timestamp = Date.now();
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;
  xhr.onreadystatechange = function() {
    let response = {
      status: xhr.status,
      statusText: xhr.statusText,
      timestamp: timestamp
    };
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status !== 200) {
        response.error = 'Internal Server Error';
      } else {
        response.data = xhr.responseText;
      }
      callback && callback(response);
    }
  };
  xhr.ontimeout = function() {
    console.log(xhr.responseText);
  };
  xhr.open(method, url);
  xhr.send(data);
}
