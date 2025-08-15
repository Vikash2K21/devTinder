const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

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

  