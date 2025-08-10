 const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
    res.status(401).send("Unauthorized access");
    }else{
        next(); // Call the next middleware or route handler
    }
};

 const userAuth = (req,res,next)=>{
    console.log("User auth is getting checked!!");
    const token = "xyzabc";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
    res.status(401).send("Unauthorized access");
    }else{
        next(); // Call the next middleware or route handler
    }
};

module.exports = {
    adminAuth,userAuth,
};