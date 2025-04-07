import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import v1Route from "./routes/v1.routes"
import cookieParser from "cookie-parser";
import {errorHandler} from "./exceptions/error_handler.exception";
import { cookie } from "express-validator";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/", v1Route);
app.use(errorHandler)

app.listen(port, () => {
  console.log("Server running on port", port);
})