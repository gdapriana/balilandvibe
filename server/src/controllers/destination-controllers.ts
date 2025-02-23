import { NextFunction, Request, Response } from "express";
import DestinationServices from "../services/destination-services";
import { Destination } from "@prisma/client";

class DestinationControllers {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Destination = req.body;
      const response = await DestinationServices.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug }: any = req.params;
      const response = await DestinationServices.get(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const queries: any = req.query;
      if (queries.district && typeof queries.district === "string") queries.district = [queries.district];
      if (queries.category && typeof queries.category === "string") queries.category = [queries.category];
      const response = await DestinationServices.gets(queries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Destination = req.body;
      const slug: string = req.params.slug;
      const response = await DestinationServices.update(request, slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async updateView(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await DestinationServices.updateView(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await DestinationServices.delete(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default DestinationControllers;
