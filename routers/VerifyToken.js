var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
    console.log('verify', req.cookies.token);
  //var token = req.headers['x-access-token'];
  var token = req.cookies.token;
  if (!token)
    return res.redirect('/auth/login');
    //return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.redirect('/auth/login');
    //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;