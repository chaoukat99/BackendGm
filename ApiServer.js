import express from "express";
import cors from "cors";
import { DeleteStudent,findAllStudent,findByStudentNumber,insertStudent,updateName } from "./dbConfig.js";





const Server=express();


Server.use(express.json());


Server.use(cors({
    origin:"*"
}))





// HTTP METHODs



Server.get("/students", async (req,res)=>{
    let students=await findAllStudent();
    res.status(200).json(students);
})



// find  student by his number 
Server.get("/students/:numberStudent",async (req,res)=>{

    const studentNumber=req.params.numberStudent;

    let searchedStudent=await findByStudentNumber(studentNumber);
    if(searchedStudent==null){
        res.status(404).json({msg:"Unfound Student"})
    }else{
        return res.status(200).json(searchedStudent);
    }
})











// Post student 



Server.post("/students",async (req,res)=>{


    const {studentnum,name,age,gender,adresse}=req.body
    
    
    let response=await insertStudent(studentnum,name,age,gender,adresse);
    res.status(201).json(response);
     
})




// Update Name 


Server.patch('/students/:studentNumber',async (req,res)=>{



    // Get studentNumber Parameter value 

    const studentNumeber=req.params.studentNumber;

    // get request body 
    const {newName}=req.body;

    let updatedStudent=await updateName(studentNumeber,newName);

    res.status(201).json(updatedStudent);

})





// Delete Student 


Server.delete("/students/:studentNumber",async (req,res)=>{
     
    const studentNum=req.params.studentNumber


    let deletedStudent=await DeleteStudent(studentNum);
    res.status(200).json({msg:deletedStudent});
})



Server.listen(7000,()=>{
    console.log("the server is running on http://localhost:7000")
})