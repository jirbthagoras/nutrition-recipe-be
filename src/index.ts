import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import {errorHandler} from "./exceptions/error_handler.exception";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", userRoutes);
app.use(errorHandler)

app.listen(port, () => {
  console.log("Server running on port", port);
})