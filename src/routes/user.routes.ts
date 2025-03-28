import {  Router } from 'express';
import { registerController } from "../controllers/user.controller";
import {validateDTO} from "../middlewares/validate.middleware";
import {registerUserSchema} from "../dtos/user.dtos";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post("/user", validateDTO(registerUserSchema), registerController);

export default router;