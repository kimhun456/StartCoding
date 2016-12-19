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

$("#resultSection").hide();


$("#button1").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz1"]:checked').val();
    sendData.answer = answer;

    $.post("/problem/0_1",sendData, function (res) {

        if(res.type == "success"){

            problemImage1.attr("src","../../images/O.png");
            problemImage1.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 1;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 1;

            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage1.attr("src","../../images/X.png");
                        problemImage1.show();
                        toastr['error']("틀렸습니다.");

                    });
                }
            });

        }else{
            var errorMessage = res.message;
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

$("#button2").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz2"]:checked').val();
    sendData.answer = answer;


    $.post("/problem/0_2",sendData, function (res) {

        if(res.type == "success"){

            problemImage2.attr("src","../../images/O.png");
            problemImage2.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 2;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 2;

            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage2.attr("src","../../images/X.png");
                        problemImage2.show();
                        toastr['error']("틀렸습니다.");

                    });
                }
            });

        }else{
            var errorMessage = res.message;
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

var sendData = {};
sendData.problem = 1;
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
sendData.problem = 2;
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