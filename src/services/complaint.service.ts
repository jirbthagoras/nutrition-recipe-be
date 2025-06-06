import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logging.utils"
import { createError } from "../exceptions/error.exception"

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
     return newComplaint.id
}

export const getComplaintById = async (
     id: number
) => {
     const complaint = await prisma.complaints.findUnique({
          where: {id},
          include: {
               Reccomendation: {
                    include: {
                         product: true
                    }
               }
          }
     })
     
     if (!complaint) {
          logger.error("Complaint not found!")
          throw createError("not found", "Internal server error", 500)
          return
     }

     logger.info(`Complain ${complaint.id} found`)
     return complaint
}