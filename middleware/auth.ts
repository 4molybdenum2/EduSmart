import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies?.token) {
        type Token = {
            id: string,
            isStudent: boolean,
        };
        try {
            const { id, isStudent } = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as Token;
            if (id && isStudent != undefined) {
                res.locals.id = id;
                res.locals.isStudent = isStudent;
            }
            return res.status(403).json({ error: "Invalid token" });
        } catch (error) {
            return res.status(403).json({ error: "Invalid token" });
        }
    } return res.status(403).json({ error: "You are not logged in" });
}