const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req,res) =>{
    //Creating a new instances of the user model
    const user = new User ({
        firstName: "Richa",
        lastName: "Rani",
        emailId: "Richa@bgp.com",
        password: "Richa@123"
    });
    try {
        await user.save();
        res.send("User added successfully!");
    }catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
    
});



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

  