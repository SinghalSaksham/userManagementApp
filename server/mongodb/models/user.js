import mongoose from "mongoose";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  revenuePercent: { type: Number, default: 10 },
  token: { type: String },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
