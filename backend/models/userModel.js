import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" }, // OTP for verification
    verifyOtpExpireAt: { type: Date, default: Date.now }, // Expiry time for OTP
    isAccountVerified: { type: Boolean, default: false }, // Flag for account verification status
    resetOtp: { type: String, default: "" }, // OTP for password reset
    resetOtpExpireAt: { type: Date, default: Date.now }, // Expiry time for password reset OTP
    isResetVerified: { type: Boolean, default: false }, // Flag for reset OTP verification
});

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
