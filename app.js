import express from "express";
import fs from "fs";
import cors from "cors"
const Server = express();
// Configurer le serveur pour lire les données json importé du body des requets (POST PUT)
Server.use(express.json());

Server.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "OPTIONS") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  next();
});
// Configurer le Cross Origin
const corsOptions = {
  origin: ["https://instructors.learn.gomycode.co","https://youcode.ma"],
  methods: ["GET"], // on n’inclut pas DELETE
};




// Custom  MiddleWare


// 1 Créer le middleware
function AgeMiddleware(req,res,next){
    let age=req.params.age
    if(age>18){
        next();
    }else{
        res.status(403).json({msg:"Unauthorized"})
        
    }

}
// 2-Appliquer le middleware avec le endpoint selectionné






// Secret Key Middleware 

function SecretKeyMiddlware(req,res,next){

const secretKey=req.query.apikey
    

     if(!secretKey){
        res.status(403).json({msg:"apikey introuvable "})
     }else if(secretKey!="123"){
         res.status(403).json({msg:"Invalid api Key "})
     }else{
        next();
     }

}












Server.use("/users",AgeMiddleware);
Server.use("/products",SecretKeyMiddlware);

// /users /products /admins /statistics


// https://react-app-gomycode.com

Server.use(cors(corsOptions))

const products = [
    {
        id: 1,
        name: "Laptop HP EliteBook",
        price: 999.99,
        category: "Electronics",
        stock: 15,
        description: "High performance business laptop"
    },
    {
        id: 2,
        name: "Smartphone Samsung Galaxy",
        price: 799.99,
        category: "Electronics",
        stock: 25,
        description: "Latest model smartphone"
    },
    {
        id: 3,
        name: "Office Desk",
        price: 299.99,
        category: "Furniture",
        stock: 10,
        description: "Modern office desk with drawers"
    },
    {
        id: 4,
        name: "Coffee Machine",
        price: 149.99,
        category: "Appliances",
        stock: 20,
        description: "Automatic coffee maker"
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 59.99,
        category: "Electronics",
        stock: 30,
        description: "RGB gaming mouse with programmable buttons"
    }
];



// GET all products
Server.get("/products/",(req,res)=>{

    res.status(200).json(products)

})


// Get single product

Server.get("/products/:id",(req,res)=>{

const id=req.params.id;


let product=products.find(el=>el.id==id)

   product==undefined?res.status(404).json({msg:"Unfound Product "}):res.status(200).json(product)

})



Server.get("/read/:filename/ext/:extension",(req,res)=>{


    // Récuperer la valeur du paramétre (url )
    const filename=req.params.filename;
    const extension=req.params.extension;

    fs.readFile(filename+extension,(err,data)=>{
        if(!err){
            res.status(200).send(data.toString());
        }else{
            res.status(404).json({msg:"Unfound Document"})

        }
    })

})



// Post

Server.post("/products/add-new-product",(req,res)=>{

    // Récupere la valeur du body 

    const {id,name,price,desc}=req.body;

    res.status(201).json({msg:`Les données du produit : ${name} avec le prix ${price} ont été Récuperé avec succés`})
})



// Create File Method 

Server.post("/files/create-new-file",(req,res)=>{

// Récuperer le body de la requete

  const {filename,contenu}=req.body;


//   Create File 
fs.writeFile(filename+".txt",contenu,(err)=>{
    if(!err){
        res.status(201).json({msg:"File created successfully"})
    }else{
        res.status(500).json({msg:"Erreur survenu "})
    }
})

})




// Create New User 

Server.post("/users/add-new-user",(req,res)=>{
    // regcupérer les données 

    const {id,nom,age,email,password}=req.body;


    // Traitement des données
    fs.appendFile("users-db.txt",`Id : ${id}\nnom: ${nom}\nage: ${age}\nemail: ${email}\npassword: ${password}\n---------\n`,(err)=>{


        if(!err){
            res.status(201).json({msg:"User Created Successfully"});
        }else{
            res.status(500).json({msg:'Error found '});
        }
    })
})

// PUT 

Server.put("/products/update-product/:id",(req,res)=>{


    // get params id 

      let my_id=req.params.id

    // get request Body 
         
    const {new_stock_value}=req.body

    // Traitement de modification
    products[my_id-1].stock=new_stock_value

    res.status(200).json({msg:"Produits Modifié ",listProduct:products})
})





// Delete

Server.delete("/products/:id",(req,res)=>{
    res.status(201).json({msg:"Produits Supprimé "})
})





// Sample users data

// GET request /users - returns all users
Server.get("/users", (request, response) => {
    response.status(200).json(users);


});


// DELETE Method


Server.delete("/users/:id",(req,res)=>{


// Get params id 

const my_id=req.params.id;



// traitement de supression a la base de L'id récuperer


    res.status(200).json({text:"user deleted"});
})





// POST request /users - add new user
Server.post("/users", (req, res) => {
   

    res.status(201).send("Post request")
});



Server.listen(7000,()=>{
    console.log("server is running on http://loclahost:7000")
})



// Sytanx


// // Server.method("/endpoint-url",(request,response)=>{
    
        // traitement de la methode backend
        // Renvoyer La réponse 
        // Res : json 
        // response.status(code_status).json({obj:"message"});
        // Res : html ||  text 
        // response.status(code_status).send("<h1>Hello </h1>");
        
// })