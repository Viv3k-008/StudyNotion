const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

// function -> to send email
// it calls mailSender to send mail
async function sendVerificationEmail(email, otp){
    try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// This means before otp is geting saved in DB , the mail will be send
// coz let say email failed to send the email then the otp will be stored in database without sending it
// we have put next coz we will have to continue the process , as we have to save the otp in database also
// next() is used to tell Mongoose to continue the save operation
OTPSchema.pre("save", async function() {
    await sendVerificationEmail(this.email, this.otp);
})

module.exports = mongoose.model("OTP" , OTPSchema);