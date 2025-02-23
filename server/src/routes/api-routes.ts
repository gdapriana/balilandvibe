import express from "express";
import DestinationControllers from "../controllers/destination-controllers";
import TraditionControllers from "../controllers/tradition-controllers";
import CategoryControllers from "../controllers/category-controllers";
import DistrictControllers from "../controllers/district-controllers";
import SourceController from "../controllers/source-controllers";
import UserControllers from "../controllers/user-controllers";
import authMiddleware from "../middleware/auth-middleware";

const apiRouter = express.Router();

apiRouter.post("/api/destinations", authMiddleware, DestinationControllers.create);
apiRouter.patch("/api/destinations/:slug", authMiddleware, DestinationControllers.update);
apiRouter.delete("/api/destinations/:slug", authMiddleware, DestinationControllers.delete);

apiRouter.post("/api/traditions", authMiddleware, TraditionControllers.create);
apiRouter.patch("/api/traditions/:slug", authMiddleware, TraditionControllers.update);
apiRouter.delete("/api/traditions/:slug", authMiddleware, TraditionControllers.delete);

apiRouter.post("/api/categories", authMiddleware, CategoryControllers.create);
apiRouter.patch("/api/categories/:slug", authMiddleware, CategoryControllers.update);
apiRouter.delete("/api/categories/:slug", authMiddleware, CategoryControllers.delete);

apiRouter.post("/api/districts", authMiddleware, DistrictControllers.create);
apiRouter.patch("/api/districts/:slug", authMiddleware, DistrictControllers.update);
apiRouter.delete("/api/districts/:slug", authMiddleware, DistrictControllers.delete);

apiRouter.post("/api/sources", authMiddleware, SourceController.create);
apiRouter.patch("/api/sources/:id", authMiddleware, SourceController.update);
apiRouter.delete("/api/sources/:id", authMiddleware, SourceController.delete);

apiRouter.delete("/api/logout", authMiddleware, UserControllers.logout);

export default apiRouter;
