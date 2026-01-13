import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 6,
      maxLength: 50
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
