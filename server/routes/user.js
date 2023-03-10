import express from "express";
import { Authenticate } from "../middleware/authenticate.js";

import {
  getUsers,
  getUser,
  createUser,
  checkUser,
  checkEmail,
  sendOTP,
  checkOTP,
  updatePassword,
  checkValidity,
  editDetails,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", checkUser);
router.post("/checkEmail", checkEmail);
router.post("/otp", sendOTP);
router.post("/verify", checkOTP);
router.put("/", updatePassword);
router.put("/edit", editDetails);
router.post("/isUserValid", Authenticate, checkValidity);

export default router;
