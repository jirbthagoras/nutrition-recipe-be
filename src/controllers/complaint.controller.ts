import { Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { getUserIdFromJWT, verifyAccessToken } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";
import { sendComplaint } from "../services/gemini.service";
import { createReccomendation } from "../services/recommendation.service";
import { createComplaint, getAllComplaintByUserId, getComplaintById } from "../services/complaint.service";
import { createProduct } from "../services/product.service";
import { logger } from "../utils/logging.utils";

export const makeComplaint = asyncHandler(async (req: Request, res: Response) => {
     // Get the payload given by client side
     const {
          complaint
     } = req.body

     // get user id from the token
     const userId = getUserIdFromJWT(req);
     logger.info(userId)

     // send the complaint with sendComplaint from gemini service
     let response = await sendComplaint(complaint)
     logger.info(response.message)
     logger.info(response.products)

     // create a complaint
     const complaintId = await createComplaint(complaint, response.message, userId)
     logger.info(complaintId)

     // Iterate through the result.products to:
     // Create a product if it's not exist
     // Create recommendations by products id
     for (const product of response.products) {
          const productId = await createProduct(product);
          await createReccomendation(complaintId, productId);
     }

     // Query the complaint with it's recommendation
     const result = await getComplaintById(complaintId)

     return res.status(201).json({
          status: "success",
          complaint: result
     })
})

export const getComplaintHistory = asyncHandler(async (req: Request, res: Response) => {
     // get user id from the token
     const userId = getUserIdFromJWT(req);
     logger.info(userId)

     // Calls the service
     const result = await getAllComplaintByUserId(userId)

     // returns
     return res.status(201).json({
          status: "success",
          history: result
     })
})