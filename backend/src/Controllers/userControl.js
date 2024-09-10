import UserSchema from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../Config/cloudnary.js";
import getdatauri from "../Utils/datauri.js";
import dotenv from "dotenv";
dotenv.config();

const Userprofile = {
  register: async (req, res) => {
    try {
      const { fname, lname, email, password, role, phone } = req.body;
      if (!fname || !lname || !email || !password || !role || !phone) {
        res.status(400).json({
          message: "All fields are required.",
          success: false,
        });
      }
      let profilephotourl = null;
      const file = req.file;
      if (file) {
        const parser = getdatauri(file);
        const cloudinaryresponse = await cloudinary.uploader.upload(
          parser.content,
          {
            folder: "profile",
          }
        );
        profilephotourl = cloudinaryresponse.secure_url;
      }
      const existingUser = await UserSchema.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          message: "Email already exists.",
          success: false,
        });
      }
      const saltrounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltrounds);
      const user = new UserSchema({
        fname,
        lname,
        email,
        password: hashedPassword,
        role,
        phone,
        role,
        profile: {
          profilephoto: profilephotourl,
        },
      });
      await user.save();
      res.status(201).json({
        message: "User registered successfully.",
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error.message);
      message: "internal error: " + error.message;
    }
  },
  login: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({
          message: "All fields are required.",
          success: false,
        });
      }

      let user = await UserSchema.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Incorrect password.",
          success: false,
        });
      }

      if (role !== user.role) {
        return res.status(403).json({
          message: "Unauthorized access.",
          success: false,
        });
      }

      // Generate JWT
      const tokendata = { userId: user._id };
      const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      user = {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        profile: user.profile.profilephoto,
      };

      return res
        .status(201)
        .cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          message: `Welcome back, ${user.fname}`,
          user,
          success: true,
        });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Internal server error: " + error.message,
        success: false,
      });
    }
  },

  updateprofile: async (req, res) => {
    try {
      const { fname, lname, email, phone, bio, skills, education } = req.body;
      const skillsArray = skills ? skills.split(",") : [];
      const educationArray = education ? education.split(",") : [];
      let resumeurl = null;
      let originalname = null;
      const file = req.file;
      if (file) {
        const data = getdatauri(file);
        const cloudinaryresponse = await cloudinary.uploader.upload(
          data.content,
          {
            folder: "resume",
          }
        );
        resumeurl = cloudinaryresponse.secure_url;
        originalname = file.originalname;
      }
      const UserId = req.user;
      const user = await UserSchema.findById(UserId);
      if (!user) {
        res.staus(400).json({
          message: "User not found.",
          success: false,
        });
      }
      if (fname) user.fname = fname;
      if (lname) user.lname = lname;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (bio) user.profile.bio = bio;
      if (skillsArray) user.profile.skills = skillsArray;
      if (educationArray) user.profile.education = educationArray;
      if (resumeurl && originalname) {
        user.profile.resume = resumeurl;
        user.profile.originalname = originalname;
      }
      await user.save();
      res.status(201).json({
        message: "updated profile successfully",
        data: user,
        success: true,
      });
    } catch (error) {
      console.log(error.message);
      message: "internal error: " + error.message;
    }
  },
  logout: async (req, res) => {
    try {
      res
        .status(201)
        .cookie("token", token, {
          maxAge: ",",
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          message: "Logged out successfully",
          success: true,
          token: null,
        });
    } catch (error) {
      console.log(error.message);
      message: "internal error: " + error.message;
    }
  },
};

export default Userprofile;
