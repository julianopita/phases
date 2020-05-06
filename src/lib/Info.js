var Info;



export default Info = {
    "descricao" : (des)=>{
        console.log("Descricao :"+des);
        var descricao = document.getElementById("descricao");
        descricao.innerHTML = des;
    },
    "area" : (area)=>{
        console.log("Area :"+area);
        var a = document.getElementById("area");
        a.innerHTML = Math.ceil(area);
    },
    // "descricao" : (des)=>{
    //     console.log("Descricao :"+des);
    // }
}