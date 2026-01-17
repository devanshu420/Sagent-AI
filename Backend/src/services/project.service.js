import mongoose from "mongoose";
import projectModel from "../models/project.model.js";


export const createProjectService = async ({name, userId}) => {
    
    if(!name){
        throw new Error("Name is required");
    }
     if(!userId){
        throw new Error("User Id is required");
    }

    const project = await projectModel.create({
        name,
        users : [userId]
    });
    return project;
}

export const getAllProjectsService = async (userId) => {
    if(!userId){
        throw new Error("User Id is required");
    }
    const projects = await projectModel.find({users: userId});
    return projects;
}



export const addUserToProjectService = async ({projectId, users, userId}) => {
    if(!projectId){
        throw new Error("Project Id is required");
    }
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
     if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }
    if(!userId){
        throw new Error("User Id is required");
    }
     if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })
       console.log(project)

    if (!project) {
        throw new Error("User not belong to this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject



    return project;
}
