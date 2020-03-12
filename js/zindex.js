var numero_um = document.getElementById("numero_um");
var numero_dois = document.getElementsByName("numero_dois");
var numero_tres = document.getElementsByName("numero_tres");


numero_um.addEventListener("click",function(){
    document.getElementById("canvas_main").setAttribute("z-index","11");
    document.getElementById("canvas_aux1").setAttribute("z-index","1");
    alert("oi");
});