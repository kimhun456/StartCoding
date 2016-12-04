/**
 * Created by hyunjae on 2016. 12. 4..
 */


$("#loginText").html("로그아웃");
var elem = document.getElementById("myCBar");
var width = 10;
var id = setInterval(frame, 10);

function frame(){
    if(width >= 100){
        clearInterval(id);
    }else{
        width++;
        elem.style.width = width + '%';
        document.getElementById("label").innerHTML = width + '%';
    }
}