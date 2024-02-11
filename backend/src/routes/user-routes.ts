import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

// signup middleware
userRoutes.get("/", getAllUsers);
// middleware to verify all data (will send back to client if data is incorrect)
userRoutes.post("/signup",validate(signupValidator), userSignup); // /user/signup
userRoutes.post("/login",validate(loginValidator), userLogin); // /user/login
userRoutes.get("/auth-status", verifyToken, verifyUser); 
userRoutes.get("/logout", verifyToken, userLogout); 
export default userRoutes;



// middleware to store user's information
