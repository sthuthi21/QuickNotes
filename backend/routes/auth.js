const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//Route for user registration
router.post("/register", async (req,res) => {
    try{
        const {name , email , password} = req.body;
        //check for existing user
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already exists!!!"});
        }
        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //create and save the user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({message: "User registered successfully!!!"});
    }catch (err){
        res.status(500).json({message: "Server Error"});
    }
});

router.post("/login", async(req,res) => {
    try{
        const {email , password} = req.body;

        //check for user
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Email doesnt exist"});

        //compare password
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) return res.status(400).json({message: "Incorrect Password"});

        //creat JWT
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token});
    } catch (err){
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;