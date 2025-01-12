const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Signup controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "The user does not exist, please signup!" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }

        // Send success message (or JWT token if needed)
        return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Login unsuccessful!" });
    }
};

module.exports = { signup, login };
