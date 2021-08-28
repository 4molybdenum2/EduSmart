import { Response } from "express";
import jwt from "jsonwebtoken";

export const signToken = (data: object, res: Response) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires,
    });
};