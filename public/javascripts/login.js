

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

    var id = $("#userId").val();
    var password = $("#password").val();

    $.ajax({
        url: '/login',
        type: 'post',
        data : {id:id,password:password},
        success: function(response){
            if(response.state == 404){
                toastr['error']('ID 혹은 PASSWORD 확인바랍니다');
            }
            else{
                location.reload();
            }
        }
    });
});

$("#joinButton").unbind().click(function () {

    var id = $("#idInput").val();
    var pw = $("#pwInput").val();

    var sendData = {};

    sendData.id = id;
    sendData.pw = pw;

    $.post('/singIn',sendData, function(data){

        console.log(data);

        if(data == 'error'){
            toastr['error']('회원가입 실패 id, pw를 확인해주세요.');
        }
        else{
            toastr['success']('회원가입 완료되었습니다.');
        }
    });


});