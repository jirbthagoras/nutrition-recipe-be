import {  Router } from 'express';
import {getUserController, loginController, registerController} from "../controllers/user.controller";
import {validateDTO} from "../middlewares/validate.middleware";
import {registerUserSchema} from "../dtos/user.dtos";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/me", getUserController);

export default router;