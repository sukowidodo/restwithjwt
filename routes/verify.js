var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      if (!token) return res.status(200).send({ code: 401, message: 'No token provided.', data : null});

      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) return res.status(200).send({ code: 401, message: 'Failed to authenticate token.', data : null });    

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
      });
  }
}

module.exports = verifyToken;