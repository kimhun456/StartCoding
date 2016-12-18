/**
 * Created by hyunjae on 2016. 12. 4..
 */

$("#loginText").html("로그아웃");
$("#loginText").unbind().click(function () {

    $.get( "/logout", function( data ) {
        console.log(dat);
    });
});

$.post("/list/getPercentage", function (res) {

    console.log(res);
    var percentage = Number(res);

    var elem = document.getElementById("myCBar");
    var width = 0;
    var id = setInterval(frame, 100);
    document.getElementById("label").innerHTML = width + '%';
    elem.style.width='0%';

    function frame(){
        if(width >= percentage){
            clearInterval(id);
        }else{
            width++;
            elem.style.width = width + '%';
            document.getElementById("label").innerHTML = width + '%';
        }
    }

});