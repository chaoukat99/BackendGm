// Importer le module Http

// const http=require("http"); // common js method 

import http from "http"   // module js method 





const myServer=http.createServer((req,res)=>{



    // Traitement du serveur 
    if(req.url=="/users" && req.method=="POST"){

        // traitement 

        res.writeHead(200,"OK");
        res.end("the server is working")
    }else if(req.url=="/users" && req.method=="GET"){
        res.writeHead(200,"OK");
        res.end("Get method is working ");
    }

})


// lancer le serveur 
myServer.listen(7000,()=>{
    console.log("server is running on http://localhost:7000");
})


