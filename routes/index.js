var express = require('express');
var router = express.Router();
var DB_handler = require('./DB_handler');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/loginUser', function(req, res){
    loginUser(req, res);
});


router.post('/joinUser', function(req, res){
    joinUser(req, res);
});


function loginUser(req,res){

    var con = DB_handler.connectDB();

    var id = req.body.id;
    var pw = req.body.pw;

    var query = 'SELECT * FROM learningC.user;';

    con.query(query, function(err, response){
        console.log(response);
        if(err){

            res.send('error');
            DB_handler.disconnectDB(con);
        }
        else{
            var idFlag = null;
            for(var i = 0 ; i < response.length; i++){
                var data = response[i];
                if(data.id == id && data.pw == pw){
                    idFlag = id;
                }
            }

            if(idFlag == null){
                res.send("fail");
            }else{
                res.send(idFlag);
            }
            DB_handler.disconnectDB(con);
        }
    });
}


function joinUser(req,res){

    var con = DB_handler.connectDB();

    var id = req.body.id;
    var pw = req.body.pw;

    var query = "INSERT INTO `learningC`.`user` (`id`, `pw`, `problems`, `percentage`) " +
        "VALUES ('"+ id + "', '" + pw + "', '[]', '0');";

    con.query(query, function(err, response){
        if(err){
            console.log(err);
            res.send('error');
            DB_handler.disconnectDB(con);
        }
        else{
            console.log(response);
            res.send("success");
            DB_handler.disconnectDB(con);
        }
    });
}

module.exports = router;
