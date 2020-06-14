var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var output = {
    auth:true,
    id:req.userId,
    body:[
      {
        productid:12345,
        name:"Kalkulator",
        price:50000},
      {
        productid:123457,
        name:"Jam Dinding",
        price:40000
      }
    ]
  };
  res.json(output);
});

module.exports = router;
