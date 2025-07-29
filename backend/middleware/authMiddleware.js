import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Use ACCESS_SECRET now (not JWT_SECRET)
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
