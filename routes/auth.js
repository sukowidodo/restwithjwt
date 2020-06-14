var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get config file
var VerifyToken = require('./verify');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync("suko", salt);
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(password, hashedPassword); //password sementara

    if (!passwordIsValid) return res.status(200).send({ code: 500, token: null });
    


    var token = jwt.sign({ id: "123456789" }, config.secret, {
        expiresIn: 5*60 
    });

    // return the information including token as JSON
    res.status(200).send({ code: 200, token: token });
    
});

router.get('/me', function(req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  
  });

module.exports = router;
