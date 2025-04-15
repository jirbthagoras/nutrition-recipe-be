import { Router } from "express";
import { getAlternateFood, getRecommendedFood, getRecommendedNutrition } from "../controllers/product.controller";
const router = Router();

router.get("/alternate", getAlternateFood)
router.get("/recommended", getRecommendedFood)
router.get("/nutrition", getRecommendedNutrition)

export default router;