import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log("Decoded Token:", decoded);

    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token not valid" });
    }

    const user = await User.findById(decoded.id);
    // console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in verifyUser middleware:", error);

    return res.status(500).json({
      success: false,
      error: "Serverside error",
      details: error.message,
    });
  }
};

export default verifyUser;
