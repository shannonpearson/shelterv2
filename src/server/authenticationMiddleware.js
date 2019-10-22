const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validateToken = (req, res, next) => {
  let token = req && req.headers && req.headers.authorization;
  if (!token) {
    return res.status(401).send({ success: false, message: 'Missing authorization token' });
  }
  if (token.startsWith('Bearer')) {
    token = token.slice(7);
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: 'Invalid token' });
    }
    req.decoded = decoded;
    return next();
  });
};

module.exports = validateToken;
