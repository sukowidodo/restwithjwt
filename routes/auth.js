var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get config file
var VerifyToken = require('./verify');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;

    var hashedPassword = bcrypt.hashSync("this is password", 8);
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(password,hashedPassword); //password sementara
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });


    var token = jwt.sign({ id: "123456789" }, config.secret, {
        expiresIn: 2*60*1000 // expires in 2 hours
    });
    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
    
});

router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  
  });

module.exports = router;
