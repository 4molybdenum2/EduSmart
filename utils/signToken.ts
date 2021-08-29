import jwt from "jsonwebtoken";

export const signToken = (data: any) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
