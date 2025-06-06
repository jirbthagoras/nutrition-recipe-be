import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logging.utils"

const prisma = new PrismaClient

export const createComplaint = async (
     complaint: string,
     message: string,
     userId: number,
) => {
     const newComplaint = await prisma.complaints.create({
          data: {
               complaint,
               message,
               userId
          }
     })
     logger.info(`Complaint created with id : ${newComplaint.id} for user : ${newComplaint.userId}`)
     return newComplaint
}