const emailValidator = require("email-validator");
const userModel = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


/******************************************************
 * @SIGNUP
 * @route /api/insta/signup
 * @method POST
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

const signup = async (req, res, next) => {
  const { name, userName, email, password, confirmPassword, bio } = req.body;
  console.log('body request',req.body)
  // console.log(name, userName, email, password, confirmPassword, bio);

  // validating all input field in the form
  if (!name || !userName || !email || !password || !bio) {
    return res.status(400).json({
      success: false,
      message: "all fields are required"
    });
  }
  const varifiedEmail = emailValidator.validate(email);
  if (!varifiedEmail) {
    return res.status(400).json({
      success: false,
      message: "please entre a valid email",
    });
  }

  // if (password !== confirmPassword) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "password and confirm password doesn't match",
  //   });
  // }

  try {
    const userDetails = new userModel(req.body);
    const result = await userDetails.save();
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Account already exist with the provided email ${email}`,
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @SIGNIN
 * @route /api/insta/signin
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const signin = async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: "userName and password both are required",
    });
  }

  try {
    const user = await userModel
      .findOne({
        userName,
      })
      .select("password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @FORGOTPASSWORD
 * @route /api/insta/forgotpassword
 * @method POST
 * @description get the forgot password token
 * @returns forgotPassword token
 ******************************************************/

const forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  console.log('email',email)

  // return response with error message If email is undefined
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    // retrieve user using given email.
    const user = await userModel.findOne({
      email
    });

    // return response with error message user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found 🙅"
      });
    }

    // Generate the token with userSchema method getForgotPasswordToken().
    const forgotPasswordToken = user.getForgotPasswordToken();

    await user.save();

    return res.status(200).json({
      success: true,
      token: forgotPasswordToken
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
/******************************************************
 * @RESETPASSWORD
 * @route /api/insta/resetpassword/:token
 * @method POST
 * @description update password
 * @returns User Object
 ******************************************************/
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  console.log('password',password,confirmPassword,token)

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirmPassword is required",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm Password does not match ❌",
    });
  }
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await userModel.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: {
        $gt: new Date(), // forgotPasswordExpiryDate() less the current date
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token or token is expired",
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "successfully reset the password",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:'something is  wrong',
    });
  }
};

/******************************************************
 * @LOGOUT
 * @route /api/insta/logout
 * @method GET
 * @description Remove the token form  cookie
 * @returns logout message and cookie without token
 ******************************************************/

const logout = async (req, res, next) => {
  try {
    const cookieOption = {
      expires: new Date(), // current expiry date
      httpOnly: true, //  not able to modify  the cookie in client side
    };

    // return response with cookie without token
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.stats(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GETUSER
 * @route /api/auth/user
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/
const getUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      // message: error.message
      message: console.log("getting user error"),
    });
  }
};
module.exports = {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  logout,
  getUser,
};
