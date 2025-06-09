import { Router } from "express";
import { validateDTO } from "../middlewares/validate.middleware";
import { makeComplaintSchema } from "../dtos/complaint.dto";
import { getComplaintHistory, makeComplaint } from "../controllers/complaint.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.use(authMiddleware);
router.post("/", validateDTO(makeComplaintSchema), makeComplaint);
router.get("/", getComplaintHistory)

export default router