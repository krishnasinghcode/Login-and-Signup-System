import express from 'express';
import { 
    signup, 
    login, 
    sendVerificationOTP, 
    verifyOTP, 
    sendResetOTP, 
    verifyResetOTP, 
    resetPassword 
} from '../controller/authController.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Send Verification OTP
router.post('/verify', sendVerificationOTP);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Send Password Reset OTP
router.post('/reset-otp', sendResetOTP);

// Verify Reset OTP
router.post('/verify-reset-otp', verifyResetOTP);

// Reset Password
router.post('/reset-password', resetPassword);

export default router;
