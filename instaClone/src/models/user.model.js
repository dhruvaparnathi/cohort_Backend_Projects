const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    usernname:{
        type: String,
        unique: [true, "Username already Exists"],
        required: [true, "username is required"]
    },
    email:{
        type: String,
        unique:[true,"Email is already Registered"],
        required: [true, "email is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/dhruv2006/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.webp"
    }
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;