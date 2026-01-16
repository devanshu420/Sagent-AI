import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";


// Register Service ********************************************************************************
export const registerUserService = async ({ username , email, password }) => {

  if(!email && !password){
    throw new Error ("Email and Password are required");
  }
  console.log("Checking user in DB:", email);

const existingUser = await userModel.findOne({ email: email.toLowerCase() });
console.log("Found user:", existingUser);
if (existingUser) {
     throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  return {
    id: user._id,
    username : user.username,
    email: user.email,
    token
  };
};

// Login Service ********************************************************************************
export const loginUserService = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    id: user._id,
    username : user.username,
    email: user.email,
    token
  };
};
