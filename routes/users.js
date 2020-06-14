var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var output = {
    code : 200,
    message : "SUCCESS",
    data : {
      id : req.userId,
      product : [
      {
        productid : 12345,
        name : "Kalkulator",
        price : 50000},
      {
        productid : 123457,
        name : "Jam Dinding",
        price : 40000
      }
    ]}
  };
  res.json(output);
});

module.exports = router;
