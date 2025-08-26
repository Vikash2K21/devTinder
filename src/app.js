const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
//write once use anywhere 
app.use(express.json());

app.post("/signup", async (req,res) =>{
    //Creating a new instances of the user model
    const user = new User (req.body);
    try {
        await user.save();
        res.send("User added successfully!");
    }catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
    
});

//Get user by email
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        console.log(userEmail);
        const user = await User.findOne({emailId: userEmail});
        if(!user){
            res.status(404).send("User Not Found");
        }else{
            res.send(user); 
        }
        res.send(user);
        // const users = await User.find({emailId:userEmail});
        // if(users.length === 0) {
        //     res.status(404).send("User not found");
        // }else{
        //     res.send(users);
        // }
        
    }catch (err) {
        res.status(400).send("Error fetching the user: ");
    }
})

//Feed API -GET /feed - get all the users from the database
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Error fetching users:");
    }
})

//Delete user from the database
app.delete("/delete", async(req,res)=>{
    const UserId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id:UserId});
        //const user = await User.findByIdAndDelete(UserId);
        res.send("User deleted Successfully");
    }catch(err){
        res.status(400).send("Something went worng");
    }
})

//Update data of the user
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    
    try{

        const ALLOWED_UPDATES = ["userId","photoUrl", "about", "gender", "age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("Update is not allowed");
        }
        const user = await User.findByIdAndUpdate({_id:userId},data, {
            returnDocument:"after",
            runValidators: true, // Ensure that the update respects the schema validation rules
        });
        console.log(user);
        res.send("User updated successfully");
    }catch(err){
        res.send(400).send("Update Failed:" + err.message);
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

  