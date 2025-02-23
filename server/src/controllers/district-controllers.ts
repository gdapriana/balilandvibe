import { NextFunction, Request, Response } from "express";
import { Category, District } from "@prisma/client";
import CategoryServices from "../services/category-services";
import DistrictServices from "../services/district-services";

class DistrictControllers {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: District = req.body;
      const response = await DistrictServices.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug }: any = req.params;
      const response = await DistrictServices.get(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const queries: any = req.query;
      const response = await DistrictServices.gets(queries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: District = req.body;
      const slug: string = req.params.slug;
      const response = await DistrictServices.update(request, slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await DistrictServices.delete(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default DistrictControllers;
