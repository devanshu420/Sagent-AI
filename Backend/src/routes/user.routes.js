import express from "express";


// Import Validators
import { registerValidator, loginValidator, validate } from "../middlewares/validator.middleware.js";

// Import Controllers
import {registerUserController , loginUserController} from "../controllers/user.controller.js"



// Router Setup
const router = express.Router();


router.post("/register", validate(registerValidator), registerUserController);


router.post("/login", validate(loginValidator), loginUserController);



export default router;