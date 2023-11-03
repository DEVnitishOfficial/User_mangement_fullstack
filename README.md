# User_mangement_fullstack

# How to run this project locally in your system

1. use → git clone https://github.com/DEVnitishOfficial/User_mangement_fullstack.git
2. npm install → it will install all the dependencies reading the package.josn file automitacially
3. set up your mongodb username and password from the mongodb atlas from the connect section.
4. if you have created your project using cra(create react app) then in white listing use " const URL = process.env.REACT_APP_URL; "
5. but if you have created your project using vite (npm create vite@latest) then in white listing use " const URL = import.meta.env.VITE_REACT_APP_URL; "


# FUNCTIONALITY OF THE PROJECT
# FRONTEND
# NPM PACKAGES
1. In this project i have used following npm packages 
i. axios : for loading the data form the server and serve it to the user on frontend
ii. react-router-dom : it is used for routing from signup to login and from login to home page where users are getting their info.
iii. and rest react and react-dom are the default that are uses for page rendering on the borwser or to convert react to actual javascript ( from jsx to javascript)

# COMPONENTS IN FRONTEND
1. SignUp.jsx : Here user signup with their details like name, userName, email, password, bio.
2. SignIn.jsx : Here user signIn with their userName and password
3. Home.jsx : Here user get the info of his profile with a default pic and followers and rest are from server like his name email and userName
4. ForgotPassword.jsx : here user can forget his password with the provided signup email
5. ResetPassword.jsx : here user can set his new password if he forgot.

# css 
1. for css here i have used tailwind css, which is A "utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in markup."



# BACKEND
# NPM PACKAGES
1. In this project i have used the following npm packages
(i) "bcrypt" : it is used for encrypting the password before saving into the database.
(ii) "cookie-parser" : Although cookie-parser are used for various purposes but here we are using it for "session management, and "user authentication".
(iii) "cors" : it is userd for corss origin request because my server is on loacalhost 5000 and my fronted is on localhost 5173 so in order to talk each other we have used cors
(iv) "crypto" : used for data encryption.
(v) ".env" : it is used for storing sensentitive information like mongodb userName and password, secret key, port number, fronted url(for giving access to the backend api)
(vi) "email-validator" : it is used for email validation if someone entere wrong email it will prevent
(vii) "jsonwebtoken" : it is used for generating token which will be used in future authentication.
(viii) "mongoose" : it is used for creating a dtabase schema that in which order or in which stracture we want to store the data.
(ix) "nodemon" : it is used for continious reloading server without killing every time manually and again restarting

# CONTROLLERS 
* Follwing are the controller so my project
1. 
/******************************************************
 * @SIGNUP
 * @route /api/insta/signup
 * @method POST
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

 2. 
 /******************************************************
 * @SIGNIN
 * @route /api/insta/signin
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

 3. 
 /******************************************************
 * @FORGOTPASSWORD
 * @route /api/insta/forgotpassword
 * @method POST
 * @description get the forgot password token
 * @returns forgotPassword token
 ******************************************************/
 4. 
 /******************************************************
 * @LOGOUT
 * @route /api/insta/logout
 * @method GET
 * @description Remove the token form  cookie
 * @returns logout message and cookie without token
 ******************************************************/
 5. 
 /******************************************************
 * @GETUSER
 * @route /api/auth/user
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/
