const express = require("express");
const userModel = require('../models/user.model');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

authRoutes.post("/register",async (req,res)=>{
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            { email },
            { username }
        ]
    });

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User Already Registered..."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        email, password: hash, username
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn:"1d" }
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user Registered",
        user,
        token
    })
})



module.exports = authRoutes;