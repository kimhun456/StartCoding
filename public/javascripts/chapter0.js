
$("#loginText").html("로그아웃");

$("#loginText").unbind().click(function () {

    $.get( "/logout", function( data ) {
        console.log(dat);
    });
});
