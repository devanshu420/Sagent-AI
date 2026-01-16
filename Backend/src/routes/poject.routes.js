import express from "express";

// Import Project Controller
import { createProjectController } from "../controllers/project.controller.js";

// Import Middlewares
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

// Router Setup
const router = express.Router();

// Project Related Routes
router.post(
  "/create-project",
  authUser,
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3 })
    .withMessage("Project name must be at least 3 characters"),
  
  createProjectController
);

export default router;
