
//로그아웃 버튼 셋팅
var loginText = $("#loginText");
loginText.html("로그아웃");
loginText.unbind().click(function () {
    $.get( "/logout", function( data ) {
        console.log(data);
    });
});