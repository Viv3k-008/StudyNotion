const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{

        // get email from req body
        const {email} = req.body;

        // check user for this email, email verification
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success:false,
                message:"Your Email is not registered with us"
            });
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                                            },
                                                            {new:true}, // by adding this we will get the updated data not the old one
                                                        );

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        // return response
        return res.json({
            success:true,
            message:"Email sent successfully, please check email and change password",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somethingh went wrong while sending reset password link on mail"
        });
    }
}

// resetPassword
exports.resetPassword = async (req,res) => {
    try{
        // fatch the data
        const {password, confirmPassword, token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching",
            });
        }

        // get userdetails from database using token
        const userDetails = await User.findOne({token:token});

        // if no token matched from database then -> token invalid
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            });
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate your token",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfull",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somethingh went wrong while sending reset password link on mail"
        });
    }
}