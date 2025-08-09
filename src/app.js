const express = require("express");
const app = express();

app.use("/user",(req,res) =>{
    res.send("HHHHHHHHHH");
})

//get method

app.get("/user", (req,res) =>{
    res.send({firstname : "vikash", lastname: "kumar"});
});

//post method 

app.post("/user",(req,res) =>{
    res.send("Save data successfully in database");
})

//delete method

app.delete("/user",(req,res) =>{
    res.send("deleted successfully");
})

//This will match all the http methods api calls to /test
app.use((req,res) => {
    res.send("Namaste nodejs!");
});


app.listen(3000, () => {
    console.log("server is running on port 3000");
});