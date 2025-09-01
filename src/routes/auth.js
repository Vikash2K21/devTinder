const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup api
authRouter.post("/signup", async (req,res) =>{
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
authRouter.post("/login", async(req,res) =>{
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

module.exports = authRouter;