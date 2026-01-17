import userModel from "../models/user.model.js";
import {
  registerUserService,
  loginUserService,
  getAllUsersService,
} from "../services/user.service.js";

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

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
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      field: error.field || null,
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
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfileUserController = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const getLogOutUserController = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User Logout successfully",
      data: token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllUsersController = async (req, res) => {
  try {
    const {userId} = req.user;
    const users = await getAllUsersService({userId});
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};