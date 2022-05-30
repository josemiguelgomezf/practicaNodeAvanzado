function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      //Resolve('result');
      reject(new Error('I have failed.'));
    }, ms)
  })
}

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

module.exports = {
  sleep,
  isAPIRequest
}