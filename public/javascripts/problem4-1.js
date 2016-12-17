$("#loginText").html("로그아웃");


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
        }else if(i%4 == 0 && i !=0){
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

    $("#resultSection").html(wrongMessage);

}

$("#submitButton").unbind().click(function () {

    var code = editor.getValue();

    console.log(code);

    var sendData = {};
    sendData.code = code;

    $.post("/problem/4_1",sendData, function (res) {

        if(res.type == "success"){
            toastr['success']("정답입니다");
        }
        else if(res.type == "wrong"){
            toastr['error']("틀렸습니다.");

            var wrongMessage = res.message;
            handleWrongMessage(wrongMessage);


        }else{
            var errorMessage = res.message;
            // console.log(errorMessage);
            handleErrorMessage(errorMessage);
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});