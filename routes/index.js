var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res)=> {
  res.json({msg: "welcome to contaxion"})
});

module.exports = router;
