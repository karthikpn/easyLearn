import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

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
