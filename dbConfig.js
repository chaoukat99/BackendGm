// connexion de base de données
import mongoose from "mongoose";



// 1 - Connexion 
mongoose.connect("mongodb://127.0.0.1:27017/UnivDb")
.then(()=>console.log("La Connexion avec LA BD   a été Crée avec succés "))
.catch(()=>console.log("Connection Failed"));


// 2- Creation de la structures des colllection 
// Créer Les Schémas 



const studentSchema=mongoose.Schema({
    studentNumber:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    dateDeCreation:{
        type:Date,
        default:Date.now
    }
   
    
})


// 3- Create Collections 

const StudentCollection=mongoose.model("student",studentSchema);



// Crud Methods 




// Find All studenst 


async function findAllStudent() {
    let student=await StudentCollection.find();
    return student;
}


// Find One student by Id 

async function findByStudentNumber(studentNum) {
    let searchFilter=await StudentCollection.findOne({studentNumber:studentNum})
    return searchFilter;

}   



// Insert Student 


async function insertStudent(studentNum,namee,agee,genderr,adressee){


    await StudentCollection.create({
        studentNumber:studentNum,
        name:namee,
        age:agee,
        gender:genderr,
        adresse:adressee
    })
    return "Student Created";
}



// Update name example 

async function updateName(studentNum,newName){
    await StudentCollection.updateOne({studentNumber:studentNum},{name:newName})
    return "Student Updated ";
}




// Delete Student 

async function DeleteStudent(studentNum){
    await StudentCollection.deleteOne({studentNumber:studentNum});
    return "Student Deleted"

}

// CRUD 


// CREATE 


// const InsertStudent= async ()=>{
       
//     await StudentCollection.create([
//         {
//         studentNumber:1234,
//         name:"hassan omar",
//         age:30,
//         gender:"male",
//         adresse:"Casablanca Maroc ",
//        },
//        {
//           studentNumber:34554,
//         name:"Sara alaoui",
//         age:23,
//         gender:"female",
//         adresse:"Rabat Maroc ",
//        }
//     ])
// }




// InsertStudent();



// Read 

// async function ListStudents() {
     
//     let users = await StudentCollection.find({age:30},{name:1,gender:1,_id:0});
//     console.log(users);
// }



// ListStudents();



// async function EditStudent() {
     
//     await StudentCollection.updateOne({name:"hassan omar"},{age:32})
//     console.log("student updated");
// }


// EditStudent();



// DELETE 

// async function DeleteStudent() {
//     await StudentCollection.deleteOne({_id:"68d6e45a3fa9627c8a78e394"})
// }



// DeleteStudent();


// console.log(await findAllStudent());

// console.log( await updateName(1256,"RIM RIM"));

// console.log(await DeleteStudent(1256));



export {findAllStudent,findByStudentNumber,updateName,DeleteStudent,insertStudent}