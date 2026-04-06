const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type:String,
    },
    dateOfBirth: {
        type:String,
    },
    about: {
        type:String,
        trim:true,       // It automatically removes extra spaces from the start and end of a string before saving to DB.
    },
    contactNumber: {
        type:Number,
        trim:true,       // It automatically removes extra spaces from the start and end of a string before saving to DB.
    }
});

module.exports = mongoose.model("Profile", profileSchema);