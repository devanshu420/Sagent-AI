import express from "express";

// Import Project Controller
import {
  createProjectController,
  getAllProjectsController,
  addUserToProjectController,
  getProjectByIdController
} from "../controllers/project.controller.js";

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
  createProjectController,
);

// Get All Project By UserId
router.get("/all-projects", authUser, getAllProjectsController);

// Add User To Project
router.put("/add-user-to-project", authUser, addUserToProjectController);

// Get Particular Project By ProjectId
router.get("/get-project/:projectId", authUser, getProjectByIdController);

export default router;
