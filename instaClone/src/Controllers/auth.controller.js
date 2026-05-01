const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerController(req,res){
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

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
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
}


async function loginController(req,res){
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or:[
            { username: username},
            { email: email }
        ]
    });

    if(!user){
        res.status(404).json({message:"User not Found!"});
    }

    const hash = crypto.createHash('md5').update(password).digest('hex');
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        res.status(401).json({message:"Password is invalid"});
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token",token);

    res.status(200).json(
        {
            message: "User Logged-in successfully!",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        }
    )

}

module.exports = {
    registerController,
    loginController
}