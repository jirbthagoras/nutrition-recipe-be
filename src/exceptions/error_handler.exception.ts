import {AppError, isAppError} from "./error";
import {Request, Response, NextFunction} from "express";

export const errorHandler = (err: AppError, _: Request, res: Response, __: NextFunction) => {

    if(isAppError(err)) {
        res.status(err.statusCode || 500).json({
            status: err.status,
            message: err.message,
            error: err.error
        })

        return
    }

    console.error("Internal server error", err)
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    })

    return

}