const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

const userSchema = new Schema(
    {
    name : {
        type : String,
        required : [true, "userName is required"],
        minlength : [5, "Name should be at least 5 Character"],
        maxLength : [50, "Name should not exceede 50 character"],
        trim : true
    },
    userName : {
        type : String,
        required : [true, "userName is required"],
        minlength : [5, "Name should be at least 5 Character"],
        maxLength : [50, "Name should not exceede 50 character"],
        trim : true
    },
    email : {
        type : String,
        required : [true, 'A valid email is required'],
        lowercase : true,
        unique : [true, "already registered"]
    },
    password : {
        type : String,
        select : false
    },
    bio : {
        type : String,
        required : true
    },
    forgotPasswordToken : {
        type : String,
    },
    forgotPasswordExpiryDate : {
        type : String
    },
    },
{
    timestamps : true,
}
);
    userSchema.pre("save", async function(next){
        if(!this.isModified('password')){
            return next()
        }  //here this refers to the current document of your db
        this.password = await bcrypt.hash(this.password, 10) //hashing password with bcrypt hasing algorithem.(salt)
        return next();
    })

    userSchema.methods = {
        jwtToken(){
            return JWT.sign(
                {id:this._id, userName:this.userName},
                process.env.SECRET,
                {expiresIn:'24h'}
            )
        },
        getForgotPasswordToken() {
            const forgotToken = crypto.randomBytes(20).toString('hex');
            //step 1 - save to DB
            this.forgotPasswordToken = crypto
              .createHash('sha256')
              .update(forgotToken)
              .digest('hex');
        
            /// forgot password expiry date
            this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min
        
            //step 2 - return values to user
            return forgotToken;
          },
    }
const userModel = mongoose.model("instaUserManagement", userSchema);
module.exports = userModel;