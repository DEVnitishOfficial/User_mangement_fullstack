const emailValidator = require('email-validator')
const userModel = require('../model/userSchema.js')

/******************************************************
 * @SIGNUP
 * @route /api/insta/signup
 * @method POST
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

const signup = async (req,res,next) => {
    const {name, email, password, confirmPassword} = req.body
    console.log(name, email, password, confirmPassword)

    // validating all input field in the form
    if(!name || !email || !password || !confirmPassword){
       return res.status(400).json({
            success : false,
            message : "all fields are required"
        })
    }
    const varifiedEmail = emailValidator.validate(email)
    if(!varifiedEmail){
        return res.status(400).json({
            success:false,
            message:"please entre a valid email"

        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success : false,
            message : "password and confirm password doesn't match"
        })
    }

    try {
        const userDetails = new userModel(req.body)
        const result = await userDetails.save()
        result.status(200).json({
            success : true,
            message : result
        })
    
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                message: `Account already exist with the provided email ${email}`
              });
        }
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
} 

/******************************************************
 * @SIGNIN
 * @route /api/auth/signin
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const signin = async (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : "email and password both are required"
        })
    }
    
    const user = userModel
    .findOne({
        email
    })
    .select("password");
    if(!user ||(! await bcrypt.compare(password,user.password))){

    }


}