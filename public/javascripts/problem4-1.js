var isCorrectImage = $("#isCorrectImage");
isCorrectImage.hide();

$("#loginText").html("로그아웃");
$("#loginText").unbind().click(function () {

    $.get( "/logout", function( data ) {
        console.log(dat);
    });
});

$("#resultSection").hide();

var editor = ace.edit("editor");

initEditor();

function initEditor() {
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setTabSize(2);
    editor.getSession().setUseSoftTabs(true);
    editor.setAutoScrollEditorIntoView(true);
}


function handleErrorMessage(errorMessage) {

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

        editor.getSession().addMarker(
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

    editor.getSession().setAnnotations(errorAnnotations);

}

function handleWrongMessage(wrongMessage){

    var resultSection =  $("#resultSection");
    resultSection.show();
    resultSection.html(wrongMessage);

}

$("#submitButton").unbind().click(function () {

    var code = editor.getValue();

    console.log(code);

    var sendData = {};
    sendData.code = code;

    $("#resultSection").hide();

    $.post("/problem/4_1",sendData, function (res) {

        if(res.type == "success"){

            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 401;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            isCorrectImage.attr("src","../../images/X.png");
            isCorrectImage.show();
            toastr['error']("틀렸습니다.");

            var wrongMessage = res.message;
            handleWrongMessage(wrongMessage);

            sendData = {};
            sendData.problem = 401;

            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);
                    });
                }
            });

        }else{
            var errorMessage = res.message;
            // console.log(errorMessage);
            handleErrorMessage(errorMessage);
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

var sendData = {};
sendData.problem = 401;
$.post("/problem/isProblemSolved", sendData,  function (res) {

    console.log(res);

    if(res ==="notSolved"){
        isCorrectImage.hide();

    }else if(res === "wrong"){
        isCorrectImage.attr("src","../../images/X.png");
        isCorrectImage.show();
    }else{
        isCorrectImage.attr("src","../../images/O.png");
        isCorrectImage.show();
    }

});