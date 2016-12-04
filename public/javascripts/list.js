/**
 * Created by hyunjae on 2016. 12. 4..
 */


$("#loginText").html("로그아웃");
var elem = document.getElementById("myCBar");
var width = 0;
var id = setInterval(frame, 100);
document.getElementById("label").innerHTML = width + '%';
elem.style.width='0%';
function frame(){
    if(width >= 10){
        clearInterval(id);
    }else{
        width++;
        elem.style.width = width + '%';
        document.getElementById("label").innerHTML = width + '%';
    }
}