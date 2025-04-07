import { Request, Response } from "express";
import { getToken, validateRefreshToken } from "../services/token.service";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { createError } from "../exceptions/error.exception";
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.utils";
import { ref } from "joi";

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
     let token: any = req.cookies.refreshToken;

     await validateRefreshToken(token);

     res.status(200).json({
          status: "success",
          message: "Successfully generate new Access Token",
          accessToken: generateAccessToken(token.userId)
     });

     return
});