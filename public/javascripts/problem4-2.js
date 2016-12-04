

$("#loginText").html("로그아웃");
$("#submitButton").unbind().click(function () {

    var code = $("#code").val();
    var sendData = {};
    sendData.code = code;

    $.post("/problem/4_2",sendData, function (res) {

        if(res == "success"){
            toastr['success']("정답입니다");
        }
        else if(res == "wrong"){
            toastr['error']("틀렸습니다.");
        }
        else if(res == "error"){
            toastr['warning']("에러가 발생하였습니다.");
        }else{
            toastr['warning']("에러가 발생하였습니다.");
        }

    });

});