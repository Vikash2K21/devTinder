const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

//write once use anywhere  
app.use(express.json());
app.use(cookieParser());

// signup api
app.post("/signup", async (req,res) =>{
    try{
    //Validating the user data
    validateSignUpData(req);

    const {firstName,lastName,emailId, password} = req.body;

    //Encrypting the password
        const  passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

    //Creating a new instances of the user model
    const user = new User ({
        firstName,
        lastName,
        emailId,
        password : passwordHash
    });
   
        await user.save();
        res.send("User added successfully!");
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
    
});

//login api
app.post("/login", async(req,res) =>{
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
         const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            //Create a JWT token
             
            const token = await user.getJWT();
           

            // Add the token to cookie and send the response back to the user

            res.cookie("token",token,{
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successfull!!!");
        }else{
            throw new Error("Invalid Credentials ");
        }
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
    
});

//profile api
app.get("/profile",userAuth,async(req,res)=>{
   try { 
    const user = req.user;
   
    res.send(user);
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

//send connection request api---
app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user = req.user;
    //sending the connection request 
    console.log("sending a connection request");

    res.send(user.firstName + " Send a connection request!"); 
})




connectDB()
 .then(() => {
    console.log("Database connection established successfully...");

    app.listen(3000 , () => {
      console.log("server is running on port 3000...");
   });
 })
 .catch((err)=>{
    console.error("Database cannot be connected!!!");
 });

  