import { generatetoken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //hash passwords
    if (!(firstName && email && password)) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields and try again" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters " });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Try logging in" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //Save user and generate JWT and send info back
      await newUser.save();
      generatetoken(newUser._id, res);

      res.status(201).json({
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400).json("Invalid user data!! Try again");
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error . please try again later", err });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials! try again" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      generatetoken(user._id, res);
      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials! try again." });
    }
  } catch (err) {
    console.error("error in login", err.message);
    res.status(500).json({ message: "internal server error! try again later" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (err) {
    console.error("error while loggin out", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    if (!avatar) {
      return res.status(400).json({ message: "profile pic required" });
    }
    const uploadedAvatar = await cloudinary.uploader.upload(avatar);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadedAvatar.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error in updating profile controler", err.message);
    res
      .status(500)
      .json({
        message: "uploading image failed due to server error! try again later",
      });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth ", err.message);
    res
      .status(500)
      .json({ message: "Internal server error while checking for user" });
  }
};
