import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userInfo } from "os";

const ACCESS_KEY: string = String(process.env.JWT_SECRETA_ACCESS_KEY);
const REFRESH_KEY: string = String(process.env.JWT_SECRET_REFRESH_KEY);


export const generateAccessToken = (userId: number) => {
    return jwt.sign({ userId }, ACCESS_KEY, {
        expiresIn: "15m"
    });
}

export const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, REFRESH_KEY, {
        expiresIn: "7d"
    });
}

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_KEY) 
    } catch (error) {
        return false
    }
}

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_KEY)
    } catch (error) {
        return false
    }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}