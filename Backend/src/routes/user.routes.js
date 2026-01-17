import express from "express";

// Import Middlewares
import {
  registerValidator,
  loginValidator,
  validate,
} from "../middlewares/validator.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

// Import Controllers
import {
  registerUserController,
  loginUserController,
  getProfileUserController,
  getLogOutUserController,
  getAllUsersController,
} from "../controllers/user.controller.js";


// Router Setup
const router = express.Router();


// Auth Related Routes
router.post("/register", validate(registerValidator), registerUserController);
router.post("/login", validate(loginValidator), loginUserController);
router.get("/profile", authUser, getProfileUserController);
router.get("/logout", authUser, getLogOutUserController);

router.get("/all-users", authUser, getAllUsersController);


export default router;
