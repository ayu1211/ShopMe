import jwt from "jsonwebtoken";

export default function generateToken(user) {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin }, // payload
    process.env.JWT_SECRET || "defaultsecret", // secret key (from .env)
    { expiresIn: "30d" } // token expiry
  );
}