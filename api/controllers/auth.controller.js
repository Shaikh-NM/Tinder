import User from "../models/user.model.js";
import { ENV_VARS } from "../utils/envVars.js";
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { name, email, password, age, gender, genderPreference } = req.body;
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "You must be atleast 18 years old",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });

    const token = generateToken(newUser._id);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("error in signup controller : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await User.matchPassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: strict,
      secure: ENV_VARS.NODE_ENV === "production",
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("error in login controller : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.error("error in logout controller : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
