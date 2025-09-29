import express from "express";
import cors from "cors";
import { DeleteStudent,findAllStudent,findByStudentNumber,insertStudent,updateName } from "./dbConfig.js";
import {rateLimit} from "express-rate-limit";
import dotenv from "dotenv";
import { SendEmail } from "./MailSender.js";


dotenv.config();

const Server=express();


Server.use(express.json());


Server.use(cors({
    origin:"*"
}))



const limiter=rateLimit({
    windowMs: 1 * 60 * 1000, 
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive,
    message:{error:"too many request , try later "}

	
})



Server.use("/students",limiter);



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



Server.get("/instructors",(req,res)=>{
    res.status(200).json({msg:"Instructors are here !"})
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



// Get sendmail


Server.post("/sendmail",(req,res)=>{

    const {email}=req.body;
  SendEmail(email);
  res.status(200).json({
    msg:"Email envoyé avec succés"
  })


})


Server.listen(process.env.PORTNUMBER,()=>{
    console.log("the server is running on http://localhost:"+process.env.PORTNUMBER)
})