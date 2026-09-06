import User from "../models/user.model.js";
import generateToken from "../config/jwtToken.js";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import { defaultAvatar } from "../utils/constant.js";

export const signup = async (req, res) => {
  try {
    const { token, name } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);

    const existingUser = await User.findOne({
      firebaseUid: decoded.uid,
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      firebaseUid: decoded.uid,
      name: name,
      email: decoded.email,
      avatar: decoded.picture || defaultAvatar,
      provider: "email",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);

    const user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const jwtToken = generateToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,
        provider: "google",
      });
    }

    const jwtToken = generateToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        firebaseUid: req.user.firebaseUid,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};