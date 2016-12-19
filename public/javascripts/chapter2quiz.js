
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

var problemImage3 = $("#problemImage3");
problemImage3.hide();

var problemImage4 = $("#problemImage4");
problemImage4.hide();



$("#button1").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz2_5"]:checked').val();
    sendData.answer = answer;

    $.post("/problem/2_5",sendData, function (res) {

        if(res.type == "success"){

            problemImage1.attr("src","../../images/O.png");
            problemImage1.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 205;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 205;

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
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

$("#button2").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz2_6"]:checked').val();
    sendData.answer = answer;


    $.post("/problem/2_6",sendData, function (res) {

        if(res.type == "success"){

            problemImage2.attr("src","../../images/O.png");
            problemImage2.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 206;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 206;
            toastr['error']("틀렸습니다.");

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
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

$("#button3").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz2_7"]:checked').val();
    sendData.answer = answer;

    $.post("/problem/2_7",sendData, function (res) {

        if(res.type == "success"){

            problemImage3.attr("src","../../images/O.png");
            problemImage3.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 207;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 207;

            toastr['error']("틀렸습니다.");
            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage3.attr("src","../../images/X.png");
                        problemImage3.show();

                    });
                }
            });

        }else{
            var errorMessage = res.message;
            toastr['warning']("에러가 발생하였습니다.");
        }
    });
});

$("#button4").unbind().click(function () {
    var sendData = {};

    var answer = $(':radio[name="quiz2_8"]:checked').val();
    sendData.answer = answer;


    $.post("/problem/2_8",sendData, function (res) {

        if(res.type == "success"){

            problemImage4.attr("src","../../images/O.png");
            problemImage4.show();
            toastr['success']("정답입니다");
            sendData = {};
            sendData.problem = 208;
            $.post("/problem/insertProblem", sendData, function (res) {
                console.log(res);
            });
        }
        else if(res.type == "wrong"){

            sendData = {};
            sendData.problem = 208;

            toastr['error']("틀렸습니다.");
            $.post("/problem/isProblemSolved", sendData,  function (res) {

                if(res === "notSolved"){
                    $.post("/problem/wrongProblem", sendData, function (res) {
                        console.log(res);

                        problemImage4.attr("src","../../images/X.png");
                        problemImage4.show();

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
sendData.problem = 205;
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
sendData.problem = 206;
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

sendData = {};
sendData.problem = 207;
$.post("/problem/isProblemSolved", sendData,  function (res) {

    console.log(res);

    if(res ==="notSolved"){
        problemImage3.hide();

    }else if(res === "wrong"){
        problemImage3.attr("src","../../images/X.png");
        problemImage3.show();
    }else{
        problemImage3.attr("src","../../images/O.png");
        problemImage3.show();
    }

});

sendData = {};
sendData.problem = 208;
$.post("/problem/isProblemSolved", sendData,  function (res) {

    console.log(res);

    if(res ==="notSolved"){
        problemImage4.hide();

    }else if(res === "wrong"){
        problemImage4.attr("src","../../images/X.png");
        problemImage4.show();
    }else{
        problemImage4.attr("src","../../images/O.png");
        problemImage4.show();
    }

});