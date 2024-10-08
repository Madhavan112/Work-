import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPassword) {1
      return res.status(400).json({ error: "Invalid Username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","");
        res.json({message:"Logged out successfully!"})
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
 
};
