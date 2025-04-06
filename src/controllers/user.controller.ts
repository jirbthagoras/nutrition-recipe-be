import {Request, Response} from 'express';
import { registerUserSchema } from "../dtos/user.dtos";
import {createUser, getUser} from "../services/user.service";
import {comparePassword, generateToken} from "../utils/auth.utils";
import {asyncHandler} from "../exceptions/async_handler.exception";
import { logger } from "../utils/logging.utils";
import {createError} from "../exceptions/error.exception";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
        const {
            username,
            email,
            password
        } = req.body;

        const user = await createUser(username, email, password);

        logger.info(`Success create user ${user.username} with email: ${user.email}`);
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            details: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            }
        });
        return
})

export const loginController = asyncHandler(async (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.body

    const user = await getUser({email: email});

    if(!await comparePassword(password, user.password)) {
        throw createError("failed", "Wrong password", 400)
    }

    res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token: generateToken(user.id)
    });
    return
})

export const getUserController = asyncHandler(async (req: Request, res: Response) => {
    const {
        userId
    } = req.params

    const user = await getUser({ id: Number(userId) });

    res.status(200).json({
        status: "success",
        message: "Successfully get user",
        details: {
            user: {
                email: user.email,
                username: user.username,
                role: user.role
            }
        }
    });
})