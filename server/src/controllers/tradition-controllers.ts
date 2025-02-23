import { NextFunction, Request, Response } from "express";
import DestinationServices from "../services/destination-services";
import { Destination, Tradition } from "@prisma/client";
import TraditionServices from "../services/tradition-services";

class TraditionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Tradition = req.body;
      const response = await TraditionServices.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug }: any = req.params;
      const response = await TraditionServices.get(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const queries: any = req.query;
      if (queries.district && typeof queries.district === "string") queries.district = [queries.district];
      const response = await TraditionServices.gets(queries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: Tradition = req.body;
      const slug: string = req.params.slug;
      const response = await TraditionServices.update(request, slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async updateView(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await TraditionServices.updateView(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const slug: string = req.params.slug;
      const response = await TraditionServices.delete(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default TraditionController;
