Create a repository
Initialize the repository
node_modules, pacakge.json, package-lock.json
Install express
create a server 
Listen to portt 3000
write a request and update scripts inside package json 
what are dependencies
what is the use of "-g" while npm install 
difference between caret and tildes (^ vs ~)

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