//  FIle handling


// import 


import fs from "fs";




// READ FILES && READ DIRECTORIES 

// fs.readFile("document.txt",(err,data)=>{
//     if(!err){
//         console.log("file data : "+data)
//     }else{
//         console.log("erreur");
//     }
// })



// Read Binary File 

// fs.readFile("index.html",(err,data)=>{
//     if(!err){
//         console.log(data.toString()) // lire le contenu en format texte
//     }else{
//         console.log("erreur");
//     }
// })



// CREATE files  write on files  || DIR


// fs.writeFile("document.txt","hello world",(err)=>{

//     if(!err){
//         console.log("fichier Créer ")
//     }else{
//         console.log(" Erreur")
//     }
// })


// appendFile

// fs.appendFile("document.txt","\n\nHello gomycoders",(err)=>{

//     if(!err){
//         console.log("fichier Créer ")
//     }else{
//         console.log(" Erreur")
//     }
// })


// UPDATE files 
// writefile


// Rename File 

// fs.rename("index.html","contact.html",(err)=>{
//     if(!err){
//         console.log("file renamed");
        
//     }else{
//         console.log("erreur");
        
//     }
// })



// DELETE files  || DIR


// fs.unlink("document.txt",(err)=>{
// if(!err){
//     console.log("file deleted");
    
// }else{
//     console.log("Erreur");
    
// }
// })






// Read DIR

// fs.readdir("assets",(err,files)=>{
//     if(!err){
//         console.log(files);
//     }else{
//         console.log("erreur");
//     }
// })


// CREATE new DIR


// fs.mkdir("images",(err)=>{
//   if(!err){
//     console.log("dossier crée")
//   }else{
//     console.log("erreur")
//   }
// })

// DELETE FOLDER


// fs.rmdir("assets",(err)=>{
//   if(!err){
//     console.log("dossier supprimé")
//   }else{
//     console.log("erreur")
//     console.log(err);
//   }
// })