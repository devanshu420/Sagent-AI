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