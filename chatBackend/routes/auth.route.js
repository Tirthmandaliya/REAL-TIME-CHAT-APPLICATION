import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRotue } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.put('/update-profile', protectRotue,updateProfile);

router.get('/check', protectRotue, checkAuth);

export default router;