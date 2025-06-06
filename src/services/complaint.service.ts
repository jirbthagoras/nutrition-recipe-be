import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logging.utils"
import { createError } from "../exceptions/error.exception"

const prisma = new PrismaClient()

export const createComplaint = async (
     complaint: string,
     message: string,
     userId: number,
) => {
     logger.info("Creating complaint")
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

     logger.info(`Complaint ${complaint.id} found`)
     return complaint
}

export const getAllComplaintByUserId = async(
     userId: number
) => {
     const complaints = await prisma.complaints.findMany({
          where: {userId},
          include: {
               Reccomendation: {
                    include: {
                         product: true
                    }
               }
          }
     })
     
     if (!complaints) {
          logger.error("Complaint not found!")
          throw createError("not found", "Internal server error", 500)
          return
     }

     return complaints
}