# DevTinder APIS

## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile /view
-PATCH /profile /edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignnored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET user/connections
-GET /user/requests/received
-Get /user/feed -Gets you the profile of the other user of the platform 


# status: ignore, interested, accepted, rejected