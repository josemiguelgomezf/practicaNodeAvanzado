function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      // resolve('resultado');
      reject(new Error('he fallado'));
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