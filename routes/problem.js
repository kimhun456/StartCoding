
var express = require('express');
var router = express.Router();
var DB_handler = require('./DB_handler');
var util = require('./util');


//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);
var envData;
envData = { OS : "linux" , cmd : "gcc"};
//envData = { OS : "windows" , cmd : "g++"};

var inputValue = "입력값 : ";
var outputValue = "결과값 : ";
var expectedValue = "정답 : ";


router.post('/4_1', util.ensureAuthenticated, function(req, res){
    problem4_1(req, res);
});

router.post('/4_2', util.ensureAuthenticated, function(req, res){
    problem4_2(req, res);
});


router.post('/4_3', util.ensureAuthenticated, function(req, res){
    problem4_3(req, res);
});

router.post('/0_1', util.ensureAuthenticated, function(req, res){
    problem0_1(req, res);
});

router.post('/0_2', util.ensureAuthenticated, function(req, res){
    problem0_2(req, res);
});


router.post('/1_1', util.ensureAuthenticated, function(req, res){
    problem1_1(req, res);
});

router.post('/1_2', util.ensureAuthenticated, function(req, res){
    problem1_2(req, res);
});

router.post('/2_1', util.ensureAuthenticated, function(req, res){
    problem2_1(req, res);
});

router.post('/2_2', util.ensureAuthenticated, function(req, res){
    problem2_2(req, res);
});

router.post('/2_3', util.ensureAuthenticated, function(req, res){
    problem2_3(req, res);
});

router.post('/2_4', util.ensureAuthenticated, function(req, res){
    problem2_4(req, res);
});

router.post('/2_5', util.ensureAuthenticated, function(req, res){
    problem2_5(req, res);
});

router.post('/2_6', util.ensureAuthenticated, function(req, res){
    problem2_6(req, res);
});

router.post('/2_7', util.ensureAuthenticated, function(req, res){
    problem2_7(req, res);
});

router.post('/2_8', util.ensureAuthenticated, function(req, res){
    problem2_8(req, res);
});


router.post('/insertProblem', util.ensureAuthenticated, function(req, res){

    var id = util.getUserId(req);
    var problem = Number(req.body.problem);

    util.insertProblemToUser(problem,id,function(error, result){

        if(error){
            res.send("error");
        }else{
            res.send(result);
        }
    });

});

router.post('/wrongProblem', util.ensureAuthenticated, function(req, res){

    var id = util.getUserId(req);
    var problem = Number(req.body.problem);

    util.wrongProblemToUser(problem,id,function(error, result){
        if(error){
            res.send("error");
        }else{
            res.send(result);
        }
    });

});

router.post('/isProblemSolved', util.ensureAuthenticated, function(req, res){

    var id = util.getUserId(req);
    var problem = Number(req.body.problem);

    console.log(problem);

    util.isProblemSolved(problem,id,function(error, result){

        if(error){
            res.send("error");
        }else{
            res.send(result);
        }
    });

});

function problem0_1(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "sequential"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem0_2(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "reserved"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem1_1(req,res){

    var code = req.body.code;

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPP(envData , code ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == "Hello World!\n"){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}

function problem1_2(req,res){

    var code = req.body.code;

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPP(envData , code ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == "스타트코딩\n스타트코딩\n"){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}


function problem2_1(req,res){

    var code = req.body.code;
    var input = "150 A";
    var output = "num = 150, c = A";

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPPWithInput(envData , code, input ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == output){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}

function problem2_2(req,res){

    var code = req.body.code;
    var input = "10 3";
    var output = "3\n0.000000\n3.333333\n";

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPPWithInput(envData , code, input ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == output){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}

function problem2_3(req,res){

    var code = req.body.code;
    var output = "char형 변수 = 1바이트\nint형 변수 = 4바이트\nfloat형 변수 = 4바이트\ndouble형 변수 = 8바이트\n";

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPP(envData , code ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == output){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}

function problem2_4(req,res){

    var code = req.body.code;
    var input = "12.456";
    var output = "num = 12.5\n";

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPPWithInput(envData , code, input ,function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            if(data.output == output){
                responseData.type = "success";
                responseData.message = data.output;
                res.send(responseData);

            }else{
                responseData.type = "wrong";
                responseData.message = data.output;
                res.send(responseData);
            }

        }
    });
}

function problem2_5(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "O"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem2_6(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "X"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem2_7(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "X"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem2_8(req,res) {

    var answer = req.body.answer;

    var responseData ={
        type: "error",
        message : ""
    };
    console.log(answer);


    if(answer === "2"){
        responseData.type = "success";
        res.send(responseData);
    }else{
        responseData.type = "wrong";
        res.send(responseData);
    }

}

function problem4_1(req,res) {

    var code = req.body.code;
    var input = [80,12,323,124,25];
    var output= ["짝수","짝수","홀수","짝수","홀수"];
    var count = 0;

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            console.log(data.error);
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            console.log(output[count]);
            if(data.output == output[count]){
                count++;
                compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                    if(data.error)
                    {
                        responseData.type = "error";
                        responseData.message = data.error;
                        console.log(data.error);
                        res.send(responseData);
                    }
                    else
                    {
                        console.log(data.output);
                        console.log(output[count]);
                        if(data.output == output[count]){
                            count++;

                            compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                if(data.error)
                                {
                                    responseData.type = "error";
                                    responseData.message = data.error;
                                    console.log(data.error);
                                    res.send(responseData);
                                }
                                else
                                {
                                    console.log(data.output);
                                    console.log(output[count]);
                                    if(data.output == output[count]){
                                        count++;

                                        compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                            if(data.error)
                                            {
                                                responseData.type = "error";
                                                responseData.message = data.error;
                                                console.log(data.error);
                                                res.send(responseData);
                                            }
                                            else
                                            {
                                                console.log(data.output);
                                                console.log(output[count]);
                                                if(data.output == output[count]){
                                                    count++;

                                                    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                                        if(data.error)
                                                        {
                                                            responseData.type = "error";
                                                            responseData.message = data.error;
                                                            console.log(data.error);
                                                            res.send(responseData);
                                                        }
                                                        else
                                                        {
                                                            console.log(data.output);
                                                            console.log(output[count]);
                                                            if(data.output == output[count]){
                                                                count++;
                                                                responseData.type = "success";
                                                                res.send(responseData);

                                                            }else{
                                                                responseData.type = "wrong";
                                                                responseData.message =
                                                                    inputValue + input[count] +"<br>" +
                                                                    expectedValue + output[count] +"<br>" +
                                                                    outputValue + data.output +"<br>";
                                                                res.send(responseData);
                                                            }

                                                        }
                                                    });

                                                }else{
                                                    responseData.type = "wrong";
                                                    responseData.message =
                                                        inputValue + input[count] +"<br>" +
                                                        expectedValue + output[count] +"<br>" +
                                                        outputValue + data.output +"<br>";
                                                    res.send(responseData);
                                                }

                                            }
                                        });

                                    }else{
                                        responseData.type = "wrong";
                                        responseData.message =
                                            inputValue + input[count] +"<br>" +
                                            expectedValue + output[count] +"<br>" +
                                            outputValue + data.output +"<br>";
                                        res.send(responseData);
                                    }

                                }
                            });

                        }else{
                            responseData.type = "wrong";
                            responseData.message =
                                inputValue + input[count] +"<br>" +
                                expectedValue + output[count] +"<br>" +
                                outputValue + data.output +"<br>";
                            res.send(responseData);
                        }

                    }
                });

            }else{
                responseData.type = "wrong";
                responseData.message =
                    inputValue + input[count] +"<br>" +
                    expectedValue + output[count] +"<br>" +
                    outputValue + data.output +"<br>";
                res.send(responseData);
            }

        }
    });

}

function problem4_2(req,res) {

    var code = req.body.code;
    var input = ["1 + 2 ","1 * 2 ","2 / 1 ","3 - 1 ","1 & 2 ","1 ^ 2 "];
    var output = ["1 + 2 = 3","1 * 2 = 2","2 / 1 = 2","3 - 1 = 2","연산 오류입니다.","연산 오류입니다."];
    var count = 0;

    var responseData ={
        type: "error",
        message : ""
    };

    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
        if(data.error)
        {
            responseData.type ="error";
            responseData.message = data.error;
        }
        else
        {
            console.log(data.output);
            console.log(output[count]);
            if(data.output == output[count]){
                count++;

                compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                    if(data.error)
                    {
                        responseData.type ="error";
                        responseData.message = data.error;
                    }
                    else
                    {
                        console.log(data.output);
                        console.log(output[count]);
                        if(data.output == output[count]){
                            count++;
                            compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                if(data.error)
                                {
                                    responseData.type ="error";
                                    responseData.message = data.error;
                                }
                                else
                                {
                                    console.log(data.output);
                                    console.log(output[count]);
                                    if(data.output == output[count]){
                                        count++;
                                        compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                            if(data.error)
                                            {
                                                responseData.type ="error";
                                                responseData.message = data.error;
                                            }
                                            else
                                            {
                                                console.log(data.output);
                                                console.log(output[count]);
                                                if(data.output == output[count]){
                                                    count++;
                                                    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                                        if(data.error)
                                                        {
                                                            responseData.type ="error";
                                                            responseData.message = data.error;
                                                        }
                                                        else
                                                        {
                                                            console.log(data.output);
                                                            console.log(output[count]);
                                                            if(data.output == output[count]){
                                                                count++;
                                                                compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                                                    if(data.error)
                                                                    {
                                                                        responseData.type ="error";
                                                                        responseData.message = data.error;
                                                                    }
                                                                    else
                                                                    {
                                                                        console.log(data.output);
                                                                        console.log(output[count]);
                                                                        if(data.output == output[count]){
                                                                            count++;

                                                                            responseData.type = "success";
                                                                            res.send(responseData);

                                                                        }else{
                                                                            responseData.type = "wrong";
                                                                            responseData.message =
                                                                                inputValue + input[count] +"<br>" +
                                                                                expectedValue + output[count] +"<br>" +
                                                                                outputValue + data.output +"<br>";
                                                                            res.send(responseData);
                                                                        }

                                                                    }
                                                                });

                                                            }else{
                                                                responseData.type = "wrong";
                                                                responseData.message =
                                                                    inputValue + input[count] +"<br>" +
                                                                    expectedValue + output[count] +"<br>" +
                                                                    outputValue + data.output +"<br>";
                                                                res.send(responseData);
                                                            }
                                                        }
                                                    });

                                                }else{
                                                    responseData.type = "wrong";
                                                    responseData.message =
                                                        inputValue + input[count] +"<br>" +
                                                        expectedValue + output[count] +"<br>" +
                                                        outputValue + data.output +"<br>";
                                                    res.send(responseData);
                                                }
                                            }
                                        });

                                    }else{
                                        responseData.type = "wrong";
                                        responseData.message =
                                            inputValue + input[count] +"<br>" +
                                            expectedValue + output[count] +"<br>" +
                                            outputValue + data.output +"<br>";
                                        res.send(responseData);
                                    }

                                }
                            });


                        }else{
                            responseData.type = "wrong";
                            responseData.message =
                                inputValue + input[count] +"<br>" +
                                expectedValue + output[count] +"<br>" +
                                outputValue + data.output +"<br>";
                            res.send(responseData);
                        }
                    }
                });

            }else{
                responseData.type = "wrong";
                responseData.message =
                    inputValue + input[count] +"<br>" +
                    expectedValue + output[count] +"<br>" +
                    outputValue + data.output +"<br>";
                res.send(responseData);
            }
        }
    });

}

function problem4_3(req,res) {

    var code = req.body.code;
    var input = ["180 170 170 ","156 160 170 ","180 177 123 ","160 134 134 ","180 190 280 "];
    var output = ["NO CRASH","CRASH 156","CRASH 123","CRASH 160","NO CRASH"];
    var count = 0;

    var responseData ={
        type: "error",
        message : ""
    };


    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
        if(data.error)
        {
            responseData.type = "error";
            responseData.message = data.error;
            res.send(responseData);
        }
        else
        {
            console.log(data.output);
            console.log(output[count]);
            if(data.output == output[count]){
                count++;
                compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                    if(data.error)
                    {
                        responseData.type = "error";
                        responseData.message = data.error;
                        res.send(responseData);
                    }
                    else
                    {
                        console.log(data.output);
                        console.log(output[count]);
                        if(data.output == output[count]){
                            count++;
                            compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                if(data.error)
                                {
                                    responseData.type = "error";
                                    responseData.message = data.error;
                                    res.send(responseData);
                                }
                                else
                                {
                                    console.log(data.output);
                                    console.log(output[count]);
                                    if(data.output == output[count]){
                                        count++;
                                        compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                            if(data.error)
                                            {
                                                responseData.type = "error";
                                                responseData.message = data.error;
                                                res.send(responseData);
                                            }
                                            else
                                            {
                                                console.log(data.output);
                                                console.log(output[count]);
                                                if(data.output == output[count]){
                                                    count++;
                                                    compiler.compileCPPWithInput(envData , code ,input[count] , function (data) {
                                                        if(data.error)
                                                        {
                                                            responseData.type = "error";
                                                            responseData.message = data.error;
                                                            res.send(responseData);
                                                        }
                                                        else
                                                        {
                                                            console.log(data.output);
                                                            console.log(output[count]);
                                                            if(data.output == output[count]){
                                                                count++;

                                                                responseData.type = "success";
                                                                res.send(responseData);
                                                            }else{
                                                                responseData.type = "wrong";
                                                                responseData.message =
                                                                    inputValue + input[count] +"<br>" +
                                                                    expectedValue + output[count] +"<br>" +
                                                                    outputValue + data.output +"<br>";
                                                                res.send(responseData);
                                                            }

                                                        }
                                                    });
                                                }else{
                                                    responseData.type = "wrong";
                                                    responseData.message =
                                                        inputValue + input[count] +"<br>" +
                                                        expectedValue + output[count] +"<br>" +
                                                        outputValue + data.output +"<br>";
                                                    res.send(responseData);
                                                }

                                            }
                                        });
                                    }else{
                                        responseData.type = "wrong";
                                        responseData.message =
                                            inputValue + input[count] +"<br>" +
                                            expectedValue + output[count] +"<br>" +
                                            outputValue + data.output +"<br>";
                                        res.send(responseData);
                                    }

                                }
                            });
                        }else{
                            responseData.type = "wrong";
                            responseData.message =
                                inputValue + input[count] +"<br>" +
                                expectedValue + output[count] +"<br>" +
                                outputValue + data.output +"<br>";
                            res.send(responseData);
                        }

                    }
                });

            }else{
                responseData.type = "wrong";
                responseData.message =
                    inputValue + input[count] +"<br>" +
                    expectedValue + output[count] +"<br>" +
                    outputValue + data.output +"<br>";
                res.send(responseData);
            }

        }
    });

}



module.exports = router;
