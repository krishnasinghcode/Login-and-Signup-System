import express from 'express';
import passport from 'passport';
import Otp from '../models/otpModel.js';
import nodemailer from 'nodemailer';
import { authenticateUser } from "../middleware/authMiddleware.js";

import { 
    signup, 
    login, 
    sendVerificationOTP, 
    verifyAndSignup, 
    sendResetOTP, 
    verifyResetOTP, 
    resetPassword,
    refreshAccessToken,
    logout,
    getProfile
} from '../controller/authController.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  // Optional: check if OTP exists to ensure OTP was verified
  const otpDoc = await Otp.findOne({ email });
  if (!otpDoc) return res.status(403).json({ message: 'OTP not verified' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  await Otp.deleteMany({ email }); // Clean up

  res.status(201).json({ message: 'User created' });
});
// Login Route
router.post('/login', login);

// Send Verification OTP
router.post('/send-otp', sendVerificationOTP);

// Verify OTP
router.post('/verify-signup', verifyAndSignup);

// Send Password Reset OTP
router.post('/reset-otp', sendResetOTP);

// Verify Reset OTP
router.post('/verify-reset-otp', verifyResetOTP);

// Reset Password
router.post('/reset-password', resetPassword);

// Refresh Access Token
router.get("/refresh-token", refreshAccessToken);

router.get("/profile", authenticateUser, getProfile);

router.post('/logout', logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return res.redirect(`http://localhost:5173/oauth-success?access=${accessToken}&refresh=${refreshToken}`);
  }
);

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email }); // Clear old OTPs

  await Otp.create({ email, otp });

  // Send via email (basic example)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your@gmail.com',
      pass: 'your-app-password'
    }
  });

  await transporter.sendMail({
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });

  res.status(200).json({ message: 'OTP sent' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const otpDoc = await Otp.findOne({ email, otp });
  if (!otpDoc) return res.status(400).json({ message: 'Invalid OTP' });

  // Optional: mark email as verified via temp memory or token (skipped for now)
  res.status(200).json({ message: 'OTP verified' });
});
export default router;
