import { Request, Response } from "express";
import { alternateFood, recommendedFood, recommendedNutrition } from "../utils/dummy.utils";
import { reconstructFieldPath } from "express-validator/lib/field-selection";

export const getAlternateFood = (req: Request, res: Response) => {
     res.status(200).json({
          status: "success",
          message: "Successfully get Alternate Food",
          data: alternateFood
     })

     return
}

export const getRecommendedFood = (req: Request, res: Response) => {
     res.status(200).json({
          status: "success",
          message: "Successfully get Recommended Food",
          data: recommendedFood
     })

     return
}

export const getRecommendedNutrition = (req: Request, res: Response) => {
     res.status(200).json({
          status: "success",
          message: "Successfully get Recommended Nutrition",
          data: recommendedNutrition
     })

     return
}