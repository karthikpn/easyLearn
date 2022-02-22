import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res.status(400).send("Password must be atleast 6 characters");
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("Email already exists");
    let hashPass = await hashPassword(password);
    const user = new User({ name, email, password: hashPass });
    user.save();
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6) {
      return res.status(400).send("Password must be atleast 6 characters");
    }
    const user = await User.findOne({ email });
    if (user) {
      const match = await comparePassword(password, user.password);
      if (match) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        user.password = undefined;
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.json(user);
      } else {
        return res.status(400).send("Wrong Password");
      }
    } else {
      return res.status(400).send("No User found.");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Sign out success" });
  } catch (error) {
    console.log(error);
  }
};
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("USER", user);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
