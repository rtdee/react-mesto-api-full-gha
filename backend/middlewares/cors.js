const allowedCors = [
  'https://rtdfront.nomoreparties.co',
  'http://rtdfront.nomoreparties.co',
  'localhost:3000',
  'localhost:5000',
  'http://rtdback.nomoreparties.co',
  'https://rtdback.nomoreparties.co',
  '84.201.177.220',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { headers } = req;
  const { origin } = headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
