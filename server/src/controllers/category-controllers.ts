import { NextFunction, Request, Response } from "express";
import { Category } from "@prisma/client";
import CategoryServices from "../services/category-services";

class CategoryControllers {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Category = req.body;
      const response = await CategoryServices.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug }: any = req.params;
      const response = await CategoryServices.get(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const queries: any = req.query;
      const response = await CategoryServices.gets(queries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Category = req.body;
      const slug: string = req.params.slug;
      const response = await CategoryServices.update(request, slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await CategoryServices.delete(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default CategoryControllers;
