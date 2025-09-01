const express = require("express");
//const User = require("./models/user");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");


//send connection request api---
requestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user = req.user;
    //sending the connection request 
    console.log("sending a connection request");

    res.send(user.firstName + " Send a connection request!"); 
})

module.exports = requestRouter;