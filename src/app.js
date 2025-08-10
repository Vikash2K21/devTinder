const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
//app.use("/user",userAuth);

app.post("/user/login",(req,res)=>{
    res.send("user logged in successfully");
})

app.get("/user", userAuth,(req,res)=>{
    res.send("user data sent");
});
app.get("/admin/getAllData",(req,res)=>{
    res.send(" Get ALL data successfully");
})
app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted data successfully");
})

app.listen(3000 , () => {
    console.log("server is running on port 3000");
});