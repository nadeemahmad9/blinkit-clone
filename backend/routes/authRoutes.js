import express from 'express' 
const router = express.Router();
import { registerUser, loginWithPassword, loginUser, verifyOTP }  from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login-password", loginWithPassword);
router.post("/login-otp", loginUser); // Renamed route for clarity if you want, or keep /login
router.post("/verify-otp", verifyOTP);

export default router