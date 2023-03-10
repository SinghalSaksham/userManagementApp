import userModel from "../mongodb/models/user.js";
import otpModel from "../mongodb/models/otp.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//email config

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.find({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, company, revenuePercent } = req.body;
    // console.log("email", email);

    const userExists = await userModel.findOne({ email });
    // console.log("userExists", userExists);

    if (userExists) return res.status(409).json(userExists);

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      company,
      revenuePercent,
    });

    // console.log("newUser", newUser);
    // const token = createToken()
    const userId = newUser._id.toHexString();
    // console.log("userId", userId);
    // console.log("user", newUser);
    const token = createToken(userId);
    // console.log("token", token);
    const resp = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          token: token,
        },
      }
    );

    res.status(200).json({ email, token });
  } catch (error) {
    console.log("error", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("email", email);
    // console.log("password", password);
    const userExists = await userModel.findOne({ email });
    // console.log("userExixtssss", userExists);
    if (userExists) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExists.password
      );
      const userId = userExists._id.toHexString();
      // console.log("entered", isPasswordCorrect);
      // console.log("id", userExists._id.toHexString());
      // const token = jwt.sign({ userId }, process.env.SECRET_KEY);

      // token = await userModel.generateAuthToken();
      // console.log("token", token);
      if (!isPasswordCorrect)
        res.status(401).json({ message: "Password is Incorrect" });
      else {
        const token = createToken(userId);
        // console.log("token", token);
        const resp = await userModel.findOneAndUpdate(
          { email },
          {
            $set: {
              token: token,
            },
          }
        );

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });
        // console.log("ressssss", resp);
        // const token = jwt.sign({ userId }, process.env.SECRET_KEY);
        res.status(200).json({
          email,
          token,
          isActive: userExists.isActive,
          isAdmin: userExists.isAdmin,
          id: userExists._id,
        });
        // res.status(200).json(userExists);
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res.status(200).json(userExists);
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const otpCode = Math.floor(Math.random() * 90000) + 10000;

      const resp = await otpModel.create({
        email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });

      const mailOptions = {
        from: "singhals.mzn@gmail.com",
        to: email,
        subject: "OTP for Password Reset",
        text: `This OTP is valid for 5 minutes. Your OTP is ${otpCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(401).json({ message: error.message });
        } else {
          //   console.log("Email sent", info.response);
          res.status(200).json(resp);
        }
      });
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log("email", email);

    const user = await otpModel.findOne({ email, code: otp });
    // console.log("user", user);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json("User does not exist");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("email1", email);
    // console.log("password", password);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkValidity = async (req, res) => {
  try {
    res.status(200).json(req.rootUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editDetails = async (req, res) => {
  try {
    const { name, email, company, revenuePercent, isActive, _id } = req.body;

    // console.log("isAdmin", isAdmin);
    // console.log("company", company);

    const user = await userModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          name,
          company,
          revenuePercent,
          isActive,
        },
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
