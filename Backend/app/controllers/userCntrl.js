import User from "../models/userModel.js";
import { validationResult } from 'express-validator';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import mongoose from "mongoose";

const userCntrl = {};

// Register new user
userCntrl.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userCount = await User.countDocuments();
        const user = new User(req.body);
        const salt = await bcryptjs.genSalt(10); // Salt rounds set to 10
        user.password = await bcryptjs.hash(user.password, salt);

        // Automatically assign admin role if this is the first user
        if (userCount === 0) {
            user.role = "admin";
        }

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Login user
userCntrl.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Reset password
userCntrl.resetPass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { password, newPassword } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ error: "Current password is incorrect." });
        }

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        await user.save();
        res.status(200).json({ message: "Password reset successful." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Fetch users account details
userCntrl.account = async (req, res) => {
    try {
        const user = await User.find().select('-password'); // Exclude password
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

userCntrl.edit=async(req,res)=>{
    const userId = req.userId;
    const body = req.body;

    try {
        const user = await User.findOne({ _id: userId })
        user.name = body.name || user.name;
        user.phone = body.phone || user.phone
        await user.save()
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

userCntrl.myAccount = async (req, res) => {
    try  {
        const user = await User.findById(req.userId) 
        res.status(200).json(user)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: "something went wrong"})
    }
}

// Fetch user account by ID
userCntrl.OwnerAccount = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const user = await User.findById(id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Forgot password
userCntrl.forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        user.otpSendMail = otp;
        user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "If an account exists with that email, an OTP has been sent." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// OTP verification
userCntrl.otpVerification = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otpSendMail: otp });
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.otpExpiresAt) {
            user.otpSendMail = undefined;
            user.otpExpiresAt = undefined;
            await user.save();
            return res.status(400).json({ message: "OTP has expired" });
        }

        user.otpSendMail = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

// Reset forgotten password
userCntrl.resetForgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        user.otpSendMail = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Change user role
userCntrl.changeRole = async (req, res) => {
    const { id } = req.params;
    if (id == req.userId) {
        return res.status(400).json({ error: "You can't change your own role" });
    }
    
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Delete user
userCntrl.destroy = async (req, res) => {
    const { id } = req.params;
    if (id === req.userId) {
        return res.status(400).json({ error: "You can't delete your own account" });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};



export default userCntrl;
