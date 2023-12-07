var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('solicitacoes', { title: 'Culture Link' });
});

module.exports = router;
