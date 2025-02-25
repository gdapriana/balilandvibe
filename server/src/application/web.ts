import express from "express";
import errorMiddleware from "../middleware/error-middleware";
import publicRoutes from "../routes/public-routes";
import apiRouter from "../routes/api-routes";
import path from "path";
export const web = express();
web.use(express.json());

web.get("/api", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

web.use(publicRoutes);
web.use(apiRouter);
web.use(errorMiddleware);

export default web