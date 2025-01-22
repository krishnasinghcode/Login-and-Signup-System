const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
// Signup controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const passwordstr = String(password);
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(passwordstr, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Signup Unsuccessful!" });
    }
};

// Login controller
const login = async (req, res) => {
    const { email, password } = req.body;
    const passwordstr = String(password);
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "The user does not exist, please signup!" });
        }

        const isMatch = await bcrypt.compare(passwordstr, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }
        // generating jwt token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({
            message: "Login successful!",
            token, // sending the token to user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Login unsuccessful!" });
    }
};

module.exports = { signup, login };
