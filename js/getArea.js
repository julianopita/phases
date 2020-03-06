//Get Area

//Chamada da função
obterDados(2097155,1442586);

// Initialize the BIMServerClient
function obterDados(roidClicado, oidClicado){

  bimServerClient.init(() => {

      // Login to the BIMServerClient
      bimServerClient.login(username, password, () => {

      bimServerClient.call("ServiceInterface", "getArea",  {roid: roidClicado , oid:oidClicado }, function(data){
           document.getElementById("area").innerHTML = "Area: "+data;
      });
      
      bimServerClient.call("ServiceInterface", "getVolume",  {roid: roidClicado , oid:oidClicado }, function(data){
           document.getElementById("volume").innerHTML = "Volume: "+data;
      });
      //Fechando o login
      });
  //Fechando o BimServerClient
  });
}