var express = require('express');
var router = express.Router();
var DB_handler = require('./DB_handler');

router.post('/', function(req, res){
    joinUser(req, res);
});


function joinUser(req,res){

    var con = DB_handler.connectDB();

    var id = req.body.id;
    var pw = req.body.pw;

    var query ="INSERT INTO `learningC`.`user` (`id`, `pw`, `correctProblems`, `wrongProblems`, `percentage`) " +
        "VALUES ('"+ id + "', '" + pw + "', '[]', '[]', '0');";

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
