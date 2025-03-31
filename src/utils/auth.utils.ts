import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET: string = String(process.env.JWT_SECRET_KEY);

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, SECRET);
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return error
    }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}