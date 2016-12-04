

toastr.options = {
    'closeButton': false,
    'debug': false,
    'newestOnTop': false,
    'progressBar': false,
    'positionClass': 'toast-top-right',
    'preventDuplicates': false,
    'onclick': null,
    'showDuration': '300',
    'hideDuration': '1000',
    'timeOut': '5000',
    'extendedTimeOut': '1000',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut'
};

function goReplace(str) {
    location.replace(str);
}

$("#loginButton").unbind().click(function () {

    var id = $("#idInput").val();
    var pw = $("#pwInput").val();

    var sendData = {};

    sendData.id = id;
    sendData.pw = pw;

    $.post('/loginUser',sendData, function(data){

        console.log(data);

        if(data == 'fail'){
            toastr['error']('로그인 실패 id, pw를 확인해주세요.');
        }
        else{
            toastr['success']('로그인 되었습니다.');
            $("#loginText").html("로그아웃");
            goReplace("/list");
        }
    });


});

$("#joinButton").unbind().click(function () {

    var id = $("#idInput").val();
    var pw = $("#pwInput").val();

    var sendData = {};

    sendData.id = id;
    sendData.pw = pw;

    $.post('/joinUser',sendData, function(data){

        console.log(data);

        if(data == 'error'){
            toastr['error']('회원가입 실패 id, pw를 확인해주세요.');
        }
        else{
            toastr['success']('회원가입 완료되었습니다.');
        }
    });


});