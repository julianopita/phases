var info;
export default info = function(){
    var descricao = document.getElementById("descricao");
    var area = document.getElementById("area");
    descricao.innerHTML = `Nome : ${sessionStorage.getItem("IfcOidName")}`;
    area.innerHTML = `Area : ${sessionStorage.getItem("IfcOidArea")}`;
}
