import { validationResult } from "express-validator";
import { createProjectService, getAllProjectsService, addUserToProjectService } from "../services/project.service.js";

export const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {name} = req.body;
    
    const userId = req.user.userId;
   
    const project = await createProjectService({name , userId});
    return res.status(200).json({project});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const {userId} = req.user;
    const projects = await getAllProjectsService(userId);
    // console.log("Projects:", projects);
     res.status(200).json({projects});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }
};

export const addUserToProjectController = async (req, res) => {
  try {
    const { projectId, users } = req.body;
    const {userId} = req.user;
       const project = await addUserToProjectService({
            projectId,
            users,
            userId: userId
        })

        return res.status(200).json({
            project
        })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }
}

