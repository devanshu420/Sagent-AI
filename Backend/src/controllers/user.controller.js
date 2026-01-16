import userModel from "../models/user.model.js";
import {
  registerUserService,
  loginUserService,
} from "../services/user.service.js";


export const registerUserController = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const user = await registerUserService(req.body);
    console.log("User created:", user);

    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    console.log("User LogedIn:", user);

    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });


    res.status(201).json({
      success: true,
      message: "User Login successfully",
      data: user,
    });
  } catch (error) {
    console.log("Login Error ", error);
  }
};

export const getProfileUserController = async (req, res) => {

  
  res.status(200).json({
    user: req.user,
  });
};



export const getLogOutUserController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: "User Logout successfully",
      data: token,
    });

  } catch (error) {
    console.log("Logout err" , error);
    
  }
}