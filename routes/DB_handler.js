var mysql = require('mysql');
/*
 *  Try to connect Database.
 *  Setting host, user, port, password and datbase.
 *  If you success to connect, you can see 'connection success!'
 *  but if you not, 'mysql connection error' sentence will be shown.
 */

function connectDB(){
    var connection = mysql.createConnection({
        host : '127.0.0.1',
        user : 'root',
        port : '3306',
        password : 'qwer1234',
        database : 'learningC',
        multipleStatements : true
    });

    connection.connect(function(err){
        if(err){
            console.error('MySQL connection Error');
            console.error(err);
            throw err;
        }else{
            console.log('Connection Success!');
        }
    });
    return connection;
}


/*
 *  Disconnect Database
 */
function disconnectDB(con){                                  // DB Disconnecting
    console.log('Database Disconnected!');
    con.end();
}

exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;