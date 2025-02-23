import { Request, Response, NextFunction } from "express";
import SourceService from "../services/source-services";
import { Source } from "@prisma/client";

class SourceController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: Source = req.body;
      const response = await SourceService.create(body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const body: Source = req.body;
      const response = await SourceService.update(body, id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const response = await SourceService.delete(id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default SourceController;
