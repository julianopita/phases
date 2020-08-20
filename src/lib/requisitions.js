const Requisition = {
    get : function(){
         return fetch("https://jsonplaceholder.typicode.com/comments",{
            method: 'GET'
        }).then(function(response){
            return response.json();
        });
    }
}


export default Requisition;