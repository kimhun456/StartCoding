var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('list', { title: 'Express' });
});


router.get('/chapter4', function(req, res, next) {
    res.render('chapter4', { title: 'Express' });
});

router.get('/chapter4/if', function(req, res, next) {
    res.render('chapter4if', { title: 'Express' });
});

router.get('/chapter5', function(req, res, next) {
    res.render('chapter5', { title: 'Express' });
});


module.exports = router;
