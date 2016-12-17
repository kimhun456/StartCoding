var express = require('express');
var router = express.Router();
var util = require('./util');
var DB_handler = require("./DB_handler");

/* GET home page. */
router.get('/', util.ensureAuthenticated,  function(req, res, next) {
    res.render('list', { title: 'Express' });
});

router.get('/chapter4', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4', { title: 'Express' });
});

router.get('/chapter4/if', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4if', { title: 'Express' });
});


router.get('/chapter4/for', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4for', { title: 'Express' });
});


router.get('/chapter4/problem1', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4Problem1', { title: 'Express' });
});

router.get('/chapter4/problem2', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4Problem2', { title: 'Express' });
});

router.get('/chapter4/problem3', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter4Problem3', { title: 'Express' });
});

router.get('/chapter5', util.ensureAuthenticated, function(req, res, next) {
    res.render('chapter5', { title: 'Express' });
});


router.post('/getPercentage', util.ensureAuthenticated, function(req, res){

    var id = util.getUserId(req);
    var con = DB_handler.connectDB();

    var query = 'SELECT * FROM learningC.user where id="' + id +'"';

    console.log(query);
    con.query(query, function(err, response){

        if(err){
            console.log(err);
        }else{

            console.log(response);
            var data = response[0].percentage;
            res.send(""+data);
            console.log(data);

        }

        DB_handler.disconnectDB(con);
    });
});



module.exports = router;
