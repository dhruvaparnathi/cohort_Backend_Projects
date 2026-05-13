const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        unique: true,
        required: [true, "username is required"],
        trim: true,
        lowercase: true
    },

    email:{
        type: String,
        unique: true,
        required: [true, "email is required"],
        trim: true,
        lowercase: true
    },

    password:{
        type: String,
        required: [true, "password is required"],
        select: false
    },

    bio:{
        type: String,
        default: "",
        maxlength: 150
    },

    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/dhruv2006/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.webp"
    }

},{
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;