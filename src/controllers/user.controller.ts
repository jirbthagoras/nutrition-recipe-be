import {Request, Response} from 'express';
import { registerUserSchema } from "../dtos/user.dtos";
import { createUser } from "../services/user.service";
import {generateToken} from "../utils/auth.utils";
import {asyncHandler} from "../exceptions/async_handler.exception";
import { logger } from "../utils/logging.utils";

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
            token: generateToken(user.id)
        });
        return
})