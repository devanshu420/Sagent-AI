import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// Register Service ********************************************************************************
export const registerUserService = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    const err = new Error("All fields are required");
    err.statusCode = 422;
    return Promise.reject(err);
  }
  console.log("Checking user in DB:", email);

  const normalizedEmail = email.toLowerCase();
  const existingUser = await userModel.findOne({
    $or: [{ email: normalizedEmail }, { username }],
  });

  if (existingUser) {
    const err = new Error(
      existingUser.email === normalizedEmail
        ? "Email already exists"
        : "Username already exists"
    );

    err.statusCode = 409;
    err.field = existingUser.email === normalizedEmail ? "email" : "username";

    return Promise.reject(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
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
    username: user.username,
    email: user.email,
    token,
  };
};



export const getAllUsersService = async () => {
  const users = await userModel.find({});
  return users;
};