import {Request, Response} from 'express';
import { registerUserSchema } from "../dtos/user.dtos";
import { createUser } from "../services/user.service";
import {AppError, createError, isAppError} from "../exceptions/error";

export const registerController = async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const user = await createUser(username, email, password);

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        // if (error instanceof createError) {
        //     const err = error as AppError;
        //
        //     res.status(err.statusCode).json({
        //         status: err.status,
        //         message: err.message,
        //         error: err.error
        //     });
        // }

        if (isAppError(error)) {
            const err = error as AppError;

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                error: err.error
            });
        }

        // res.status(400).json({
        //     status: "jelek",
        //     message: "jelek",
        //     error: "kocak"
        // });
    }
}