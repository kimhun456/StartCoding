
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
