/**
 * Created by hyunjae on 2016. 12. 19..
 */

//로그아웃 버튼 셋팅
var loginText = $("#loginText");
loginText.html("로그아웃");
loginText.unbind().click(function () {
    $.get( "/logout", function( data ) {
        console.log(data);
    });
});

var problemImage1 = $("#problemImage1");
problemImage1.hide();

var problemImage2 = $("#problemImage2");
problemImage2.hide();


var editor1 = ace.edit("editor1");
var editor2 = ace.edit("editor2");
initEditor();

function initEditor() {
    editor1.getSession().setMode("ace/mode/c_cpp");
    editor1.setTheme("ace/theme/chrome");
    editor1.getSession().setTabSize(2);
    editor1.getSession().setUseSoftTabs(true);
    editor1.setAutoScrollEditorIntoView(true);
    editor2.getSession().setMode("ace/mode/c_cpp");
    editor2.setTheme("ace/theme/chrome");
    editor2.getSession().setTabSize(2);
    editor2.getSession().setUseSoftTabs(true);
    editor2.setAutoScrollEditorIntoView(true);
}

function showResult(message, id){
    var resultSection =  $(id);
    resultSection.html(message);

}

$("#button1").unbind().click(function () {
    var code = editor1.getValue();
    console.log(code);

    var sendData = {};
    sendData.code = code;


    $.post("/problem/2_1",sendData, function (res) {

        if(res.type == "success"){
            showResult(res.message,"#console1");

            problemImage1.attr("src","../../images/O.png");
            problemImage1.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 201;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 201;
            showResult(res.message,"#console1");

            toastr['error']("틀렸습니다.");

            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage1.attr("src","../../images/X.png");
                        problemImage1.show();

                    });
                }
            });

        }else{
            var errorMessage = res.message;
            handleErrorMessage1(errorMessage);
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

$("#button2").unbind().click(function () {

    var code = editor2.getValue();
    console.log(code);

    var sendData = {};
    sendData.code = code;

    $.post("/problem/2_2",sendData, function (res) {

        if(res.type == "success"){

            showResult(res.message,"#console2");
            problemImage2.attr("src","../../images/O.png");
            problemImage2.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 202;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 202;
            toastr['error']("틀렸습니다.");

            showResult(res.message,"#console2");

            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage2.attr("src","../../images/X.png");
                        problemImage2.show();

                    });
                }
            });

        }else{
            var errorMessage = res.message;
            handleErrorMessage2(errorMessage);
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

var sendData = {};
sendData.problem = 201;
$.post("/problem/isProblemSolved", sendData,  function (res) {

    console.log(res);

    if(res ==="notSolved"){
        problemImage1.hide();

    }else if(res === "wrong"){
        problemImage1.attr("src","../../images/X.png");
        problemImage1.show();
    }else{
        problemImage1.attr("src","../../images/O.png");
        problemImage1.show();
    }

});

sendData = {};
sendData.problem = 202;
$.post("/problem/isProblemSolved", sendData,  function (res) {

    console.log(res);

    if(res ==="notSolved"){
        problemImage2.hide();

    }else if(res === "wrong"){
        problemImage2.attr("src","../../images/X.png");
        problemImage2.show();
    }else{
        problemImage2.attr("src","../../images/O.png");
        problemImage2.show();
    }

});




function handleErrorMessage1(errorMessage) {

    Range = require('ace/range').Range;
    var strArray = errorMessage.split(':');

    var errorNumber = [];
    var errorContent =[];
    var errorAnnotations = [];

    for(var i = 0; i < strArray.length; i++){

        if(i%4 == 1){
            errorNumber.push(Number(strArray[i]));
        }
        else if(i%4 === 0 && i !==0){
            errorContent.push(strArray[i]);
        }
    }

    console.log(errorNumber);
    console.log(errorContent);

    strArray ="";

    for(i = 0; i < errorContent.length; i++){
        strArray = errorContent[i].split(/\r?\n/);
        errorContent[i] = strArray[0];
    }

    for(i = 0 ; i < errorNumber.length; i++){

        editor1.getSession().addMarker(
            new Range(errorNumber[i] - 1, 0,errorNumber[i] -1 , 3),
            "warning",
            "line",
            true);

        var error = {
            row: errorNumber[i]-1,
            column: 10,
            text: errorContent[i],
            type: "error" // also warning and information
        };

        errorAnnotations.push(error);
    }

    editor1.getSession().setAnnotations(errorAnnotations);

}

function handleErrorMessage2(errorMessage) {

    Range = require('ace/range').Range;
    var strArray = errorMessage.split(':');

    var errorNumber = [];
    var errorContent =[];
    var errorAnnotations = [];

    for(var i = 0; i < strArray.length; i++){

        if(i%4 == 1){
            errorNumber.push(Number(strArray[i]));
        }
        else if(i%4 === 0 && i !==0){
            errorContent.push(strArray[i]);
        }
    }

    console.log(errorNumber);
    console.log(errorContent);

    strArray ="";

    for(i = 0; i < errorContent.length; i++){
        strArray = errorContent[i].split(/\r?\n/);
        errorContent[i] = strArray[0];
    }

    for(i = 0 ; i < errorNumber.length; i++){

        editor2.getSession().addMarker(
            new Range(errorNumber[i] - 1, 0,errorNumber[i] -1 , 3),
            "warning",
            "line",
            true);

        var error = {
            row: errorNumber[i]-1,
            column: 10,
            text: errorContent[i],
            type: "error" // also warning and information
        };

        errorAnnotations.push(error);
    }

    editor2.getSession().setAnnotations(errorAnnotations);

}