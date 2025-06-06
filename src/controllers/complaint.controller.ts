import { Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { getUserIdFromJWT, verifyAccessToken } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";
import { sendComplaint } from "../services/gemini.service";
import { createReccomendation } from "../services/recommendation.service";
import { createComplaint, getComplaintById } from "../services/complaint.service";
import { createProduct } from "../services/product.service";

export const makeComplaint = asyncHandler(async (req: Request, res: Response) => {
     // Get the payload given by client side
     const {
          complaint
     } = req.body

     // get user id from the token
     const userId = getUserIdFromJWT(req);

     // send the complaint with sendComplaint from gemini service
     let response = await sendComplaint(complaint)

     // create a complaint
     const complaintId = await createComplaint(complaint, response.message, userId)

     // Iterate through the result.products to:
     // Create a product if it's not exist
     // Create recommendations by products id
     response.products.forEach(async product => {
          // Create product
          let productId = await createProduct(product)
          // Craete recommendation
          await createReccomendation(complaintId, productId)
     });

     // Query the complaint with it's recommendation
     const result = getComplaintById(complaintId)

     return res.status(201).json({
          status: "success",
          complaint: result
     })
})