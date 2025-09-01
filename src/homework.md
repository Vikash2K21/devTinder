-Create a repository
-Initialize the repository
-node_modules, pacakge.json, package-lock.json
-Install express
-create a server 
-Listen to portt 3000
-write a request and update scripts inside package json 
-what are dependencies
-what is the use of "-g" while npm install 
-difference between caret and tildes (^ vs ~)

-initialize git 
.gitignore
-create a remote repo on github 
-push all code to rempte origin 
-play with routes and route etensions ex. /hello, /test, / xyz
-order of the routes matter a lot 
-Install postman App and make a workspace/ collection and Test api call
-write logic to handle GET, POST , DELETE, PATCH  API call and test them on postman 
-Explore routing and use of ?,*,(), * in the routes
-Use of regex in routes /a/ , /.*fly$/
-Reading the query params in the routes 
-reading the dynamic routes

-Multiple Route handlers - play with the code 
-next()
-next function and errors along with res.send()
-app.use("/route", rH, [rH2,rH3],rH4,rH5);
-what is middleware  adn how expressjs basically handale  behind the senes
-Difference  app.use and app.all
-write a dummy auth middleware for adminn 
-write a dummy middleware for all user routes , except /user/login
-error handling using app.use("/",(err, req, res, next) = {})

-create a free cluster on mongodb official website and that is known is ongodb atlas 
-Install mangoose library
-connect your application to the database <"Connection -url">/ devTinder
-call the connectdb function and connect to database befire starting application on 3000
-Create a user Schema and user model
-create POST/signup API to add data to database
-push some documents using API calls from postman
-Error Handling using try , catch

-js vs json(difference)
-Add the  express.json middleware to your app
-MAke your signup API dynamic to recieve data from the user end
-all complete otherwise  you forget easily.
-User.findOne with duplicate email ids, which object returned
 -API - Get user by Email
 -API - Feed - GET/feed  - get all the users from the database
 -API - Get user by ID 
 -Create delete API
 -Difference between PATCH and PUT
 -API Update the user 
 -Explore the Mongoose model for Documentation model methods
 -what are options in a Model.findOneAndUpdate method, explore more about it
 -API Update the user with email Id

 -Explain the SchemaType options from the documentation
 -add required , unique, lowercase, min, minlength, trim,
 -Add default
 -Create a customvalidate function for gender
 -Improve the DB Schema - put all appropriate validation on each fiels in schema 
 -Add timestamps to the userschema

 -Never trust req.body
 -Add API level validation on patch request and signup post api
 - DATA SAnitizing  Add ApI validation for each field 
 -Install validator
 -Explore validator library function and use validator func for password , email, 

 -Validate data is signup api
 -Install bcrypt package
 -create passwordHash using bcrypt.hash and save the user is encrypted password
 -create login api
-compare password and throw errors if email or password is invalid

-Install cookie-parser
-send a dumy cookie to user
-Create a GET /Profile API and check if you get the cookie back
-Install jsonwebtoken
-In login API, after email and password validation , create a jwt token and send it to user
-Read the cookies inside your profile API and find the logged in user

-----------------------------------------------------------------------
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
        if(data?. skills.length > 10){
            throw new Error("Skills cannot be more than 10");
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


-userAuth Middleware
-Add the user Auth Middleware in profile API and a new sendConnectionRequest API
-set the expiry of JWT token and cookies to 7 days 
-Create user schema method to getJWT()
-create UserSchema method to comparePassword(passwordInputByUser)

-Explore tinder APIs
-create a list all API you can think of in devtinder
-Group multiple routes under respective routers