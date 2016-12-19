var DB_handler = require('./DB_handler');

var totalProblemNumbers = 100;


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};


function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/login');
}

function insertProblemToUser(problemNumber, id, next){

    var con = DB_handler.connectDB();

    var query = 'SELECT * FROM learningC.user where id = "' + id + '"';

    con.query(query, function(err, response){
        if(err){
            console.log(err);
            next(true, null);
            DB_handler.disconnectDB(con);
        }
        else{
            console.log(response);

            if(response.length == 0){

                DB_handler.disconnectDB(con);
                next(true, null);
            }
            else{
                var correctProblems = response[0].correctProblems;
                correctProblems = JSON.parse(correctProblems);
                console.log(correctProblems);
                correctProblems = correctProblems.sort();

                var wrongProblems = response[0].wrongProblems;
                wrongProblems = JSON.parse(wrongProblems);
                console.log(wrongProblems);
                wrongProblems = wrongProblems.sort();

                //만약 데이터 어레이에 프라블럼이 들어 있으면
                if(contains.call(correctProblems, problemNumber)){
                    DB_handler.disconnectDB(con);
                    next(false, "not change");

                }
                // 데이터에 추가하고 퍼센테이지도 반영한다.
                else{

                    if(contains.call(wrongProblems, problemNumber)){
                        var index = wrongProblems.indexOf(problemNumber);
                        if (index > -1) {
                            wrongProblems.splice(index, 1);
                        }
                    }

                    var wrongResult = wrongProblems.toString();
                    wrongResult = "[" + wrongResult + "]";

                    correctProblems.push(problemNumber);
                    correctProblems.sort();
                    var correctResult = correctProblems.toString();
                    correctResult = "[" + correctResult + "]";

                    var arrayLen = correctProblems.length;
                    var percentage = Math.round((arrayLen / totalProblemNumbers) * 100);


                    console.log("correctResult : " + correctResult);
                    console.log("wrongResult : " + wrongResult);
                    console.log("percentage : " + percentage);

                    var query = "UPDATE `learningC`.`user` SET " +
                        "`correctProblems`='" + correctResult + "', " +
                        "`wrongProblems`='" + wrongResult +"', " +
                        "`percentage`='" + percentage + "' " +
                        "WHERE `id`='" + id + "';";


                    con.query(query, function(err, response){
                        if(err){
                            console.log(err);
                            next(true, null);
                            DB_handler.disconnectDB(con);
                        }
                        else{
                            console.log(response);
                            next(false, "change");
                        }
                    });
                }
            }
        }
    });

}

function isProblemSolved(problemNumber, id, next){
    var con = DB_handler.connectDB();

    var query = 'SELECT * FROM learningC.user where id = "' + id + '"';

    con.query(query, function(err, response){
        if(err){
            console.log(err);
            next(true, null);
            DB_handler.disconnectDB(con);
        }
        else{
            console.log(response);

            if(response.length == 0){
                DB_handler.disconnectDB(con);
                next(true, null);
            }
            else{
                var correctProblems = response[0].correctProblems;
                correctProblems = JSON.parse(correctProblems);
                console.log(correctProblems);
                correctProblems = correctProblems.sort();

                var wrongProblems = response[0].wrongProblems;
                wrongProblems = JSON.parse(wrongProblems);
                console.log(wrongProblems);
                wrongProblems = wrongProblems.sort();

                console.log(problemNumber);



                //만약 데이터 어레이에 프라블럼이 들어 있으면
                if(contains.call(correctProblems, problemNumber)){

                    console.log( " contatinttndskfa");
                    DB_handler.disconnectDB(con);
                    next(false, "correct");
                }
                // 데이터에 추가하고 퍼센테이지도 반영한다.
                else if(contains.call(wrongProblems, problemNumber)){
                    DB_handler.disconnectDB(con);
                    next(false, "wrong");
                }else{
                    DB_handler.disconnectDB(con);
                    next(false, "notSolved")
                }
            }
        }
    });
}

function wrongProblemToUser(problemNumber, id, next){

    var con = DB_handler.connectDB();

    var query = 'SELECT * FROM learningC.user where id = "' + id + '"';

    con.query(query, function(err, response){
        if(err){
            console.log(err);
            next(true, null);
            DB_handler.disconnectDB(con);
        }
        else{
            console.log(response);

            if(response.length == 0){

                DB_handler.disconnectDB(con);
                next(true, null);
            }
            else{

                var wrongProblems = response[0].wrongProblems;
                wrongProblems = JSON.parse(wrongProblems);
                console.log(wrongProblems);
                wrongProblems = wrongProblems.sort();

                //만약 데이터 어레이에 프라블럼이 들어 있으면
                if(contains.call(wrongProblems, problemNumber)){
                    DB_handler.disconnectDB(con);
                    next(false, "not change");

                }
                // 데이터에 추가하고 퍼센테이지도 반영한다.
                else{

                    wrongProblems.push(problemNumber);
                    wrongProblems.sort();
                    var wrongResult = wrongProblems.toString();
                    wrongResult = "[" + wrongResult + "]";

                    console.log("wrongResult : " + wrongResult);

                    var query = "UPDATE `learningC`.`user` SET " +
                        "`wrongProblems`='" + wrongResult + "' " +
                        "WHERE `id`='" + id + "';";

                    con.query(query, function(err, response){
                        if(err){
                            console.log(err);
                            next(true, null);
                            DB_handler.disconnectDB(con);
                        }
                        else{
                            console.log(response);
                            next(false, "change");
                        }
                    });
                }
            }
        }
    });

}


function getUserInfo(req){
    return req.session.passport.user;
}

function getUserId(req){
    return req.session.passport.user.id;
}

function getUserGrade(req){
    return req.session.passport.user.grade;
}

function getUserName(req){
    return req.session.passport.user.name;
}

exports.ensureAuthenticated = ensureAuthenticated;
exports.getUserInfo = getUserInfo;
exports.getUserId = getUserId;
exports.getUserGrade = getUserGrade;
exports.getUserName = getUserName;
exports.insertProblemToUser = insertProblemToUser;
exports.wrongProblemToUser = wrongProblemToUser;
exports.isProblemSolved = isProblemSolved;