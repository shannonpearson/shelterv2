const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validateToken = (req, res, next) => {
  let token = req && req.headers && req.headers.authorization;
  console.log('MIDDLEWARE', token);
  if (!token) {
    console.log('no token');
    return res.json({ success: false, message: 'Missing authorization token' });
  }
  if (token.startsWith('Bearer')) {
    token = token.slice(7);
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log('bad token');
      return res.json({ success: false, message: 'Invalid token' });
    }
    req.decoded = decoded;
    return next();
  });
};

module.exports = validateToken;
