import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/auth.utils";
import { createError } from "../exceptions/error";

const prisma = new PrismaClient();

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    if (
        await prisma.users.findUnique({ where: { email } })
    ) {
        throw createError("failed", "Email already exists", 400)
    }

    const hashedPassword = await hashPassword(password);

    return prisma.users.create({
        data: {
            username,
            password: hashedPassword,
            email,
            role: "USER"
        }
    })
}