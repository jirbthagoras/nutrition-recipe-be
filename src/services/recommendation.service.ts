import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logging.utils"

const prisma = new PrismaClient()

export const createReccomendation = async(
     complaintId: number,
     productId: number
) => {
     const recommendation = await prisma.recommendation.create({
          data: {
               complaintId,
               productId
          }
     })
     logger.info(`New Recomendation created ${complaintId}`)
     return recommendation
}