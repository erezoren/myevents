let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
  res.json({status: "Server is UP!!!!!"});
});

module.exports = router;
