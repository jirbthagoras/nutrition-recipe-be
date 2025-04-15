import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import foodRoute from "./food.routes";

const router = Router()

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/food", foodRoute)

export default router