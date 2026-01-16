import { validationResult } from "express-validator";
import { createProjectService } from "../services/project.service.js";


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

