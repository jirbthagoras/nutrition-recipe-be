import { NextFunction, Request, Response } from 'express';
import { verifyToken } from "../utils/auth.utils";
import {AppError, createError} from "../exceptions/error";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    try {
        if (!token) {
            throw createError(
                "Unauthorized",
                "Token Required",
                401
            );
        }

        if(!verifyToken(token)) {
            throw createError(
                "Unauthorized",
                "Token Invalid",
                401
            );
        }

        next()
    } catch (error) {
        if (error instanceof createError) {
            const err = error as AppError

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })
        }
    }
}