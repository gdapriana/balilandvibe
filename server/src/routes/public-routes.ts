import express from "express";
import DestinationControllers from "../controllers/destination-controllers";
import TraditionController from "../controllers/tradition-controllers";
import CategoryControllers from "../controllers/category-controllers";
import DistrictControllers from "../controllers/district-controllers";
import UserControllers from "../controllers/user-controllers";

const publicRoutes = express.Router();

publicRoutes.get("/api/destinations", DestinationControllers.gets);
publicRoutes.get("/api/destinations/:slug", DestinationControllers.get);
publicRoutes.patch("/api/destinations/:slug/view", DestinationControllers.updateView);

publicRoutes.get("/api/traditions", TraditionController.gets);
publicRoutes.get("/api/traditions/:slug", TraditionController.get);
publicRoutes.patch("/api/traditions/:slug/view", TraditionController.updateView);

publicRoutes.get("/api/categories", CategoryControllers.gets);
publicRoutes.get("/api/categories/:slug", CategoryControllers.get);

publicRoutes.get("/api/districts", DistrictControllers.gets);
publicRoutes.get("/api/districts/:slug", DistrictControllers.get);

publicRoutes.post("/api/register", UserControllers.register);
publicRoutes.post("/api/login", UserControllers.login);

export default publicRoutes;
