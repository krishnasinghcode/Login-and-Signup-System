import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';

dotenv.config();

const app = express();

// ✅ CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // React frontend origin
    credentials: true               // Allow sending cookies
}));

// Middleware
app.use(express.json());

// Database
connectDB(process.env.MONGO_URI);

app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
