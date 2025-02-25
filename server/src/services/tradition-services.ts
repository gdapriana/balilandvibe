import { Destination, Tradition } from "@prisma/client";
import validation from "../validation/validation";
import slugify from "slugify";
import db from "../application/database";
import ResponseError from "../error/response-error";
import { Queries } from "../types";
import TraditionValidation from "../validation/tradition-validation";

class TraditionServices {
  static async create(body: Tradition) {
    const bodyCheck = validation.validate(TraditionValidation.CREATE, body);
    const slug: string = slugify(bodyCheck.name, { lower: true });
    const isItemExit: Tradition | null = await db.tradition.findFirst({ where: { slug } });
    if (isItemExit) throw new ResponseError(400, "already exist");
    return db.tradition.create({
      data: { ...bodyCheck, slug },
      select: {
        name: true,
      },
    });
  }
  static async get(slug: string) {
    const item = await db.tradition.findUnique({
      where: { slug },
      include: {
        _count: true,
        district: {
          select: {
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        sources: {
          select: {
            id: true,
            citationNum: true,
            name: true,
            year: true,
            publisher: true,
            doi: true,
            weblink: true,
            accessed: true,
          },
        },
      },
    });
    if (!item) throw new ResponseError(404, "not found");
    return item;
  }
  static async gets(queries: Queries) {
    const queriesCheck = validation.validate(TraditionValidation.GET_QUERIES, queries);
    if (queriesCheck.page && queriesCheck.take) throw new ResponseError(400, "page and count query cannot be merged");
    let dis: { districtSlug: string }[] = [];
    if (queriesCheck.district) {
      for (const dist of queriesCheck.district) {
        dis.push({ districtSlug: dist });
      }
    }
    const totalItems = await db.tradition.count();
    const perPageItems = await db.tradition.count({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { address: { contains: queriesCheck.address, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
          { OR: dis },
        ],
      },
      orderBy: {
        viewed: queriesCheck.sort === "viewed" ? "desc" : undefined,
        name: queriesCheck.sort === "name" ? "desc" : undefined,
      },
      take:
        queriesCheck.page && Number(queriesCheck.page) !== 0
          ? 10
          : queriesCheck.take && Number(queriesCheck.take)
            ? Number(queriesCheck.take)
            : undefined,
      skip: queriesCheck.page && Number(queriesCheck.page) !== 0 ? Number(queriesCheck.page) * 10 - 10 : undefined,
    });
    const items = await db.tradition.findMany({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { address: { contains: queriesCheck.address, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
          { OR: dis },
        ],
      },
      orderBy: {
        viewed: queriesCheck.sort === "viewed" ? "desc" : undefined,
        name: queriesCheck.sort === "name" ? "asc" : undefined,
      },
      take:
        queriesCheck.page && Number(queriesCheck.page) !== 0
          ? 10
          : queriesCheck.take && Number(queriesCheck.take)
            ? Number(queriesCheck.take)
            : undefined,
      skip: queriesCheck.page && Number(queriesCheck.page) !== 0 ? Number(queriesCheck.page) * 10 - 10 : undefined,
      select: {
        id: true,
        name: true,
        slug: true,
        cover: true,
        viewed: true,
        description: true,
      },
    });
    return {
      totalItems,
      perPageItems,
      items,
    };
  }
  static async update(body: Tradition, slug: string) {
    const bodyCheck = validation.validate(TraditionValidation.UPDATE, body);
    const isItemExists = await db.tradition.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    if (bodyCheck.name) {
      const newSlug: string = slugify(bodyCheck.name, { lower: true });
      const itemAlreadyExist = await db.tradition.findUnique({ where: { slug: newSlug } });
      if (itemAlreadyExist) throw new ResponseError(400, "already exists");
      return db.tradition.update({ where: { slug }, data: { ...bodyCheck, slug: newSlug } });
    }
    return db.tradition.update({ where: { slug }, data: bodyCheck });
  }
  static async updateView(slug: string) {
    const isItemExist = await db.tradition.findUnique({ where: { slug } });
    if (!isItemExist) throw new ResponseError(404, "not found");
    const currentView: number = isItemExist.viewed;
    return db.tradition.update({
      where: { slug },
      data: {
        viewed: currentView + 1,
      },
      select: { name: true },
    });
  }
  static async delete(slug: string) {
    const isItemExists = await db.tradition.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    return db.tradition.delete({ where: { slug }, select: { name: true } });
  }
}

export default TraditionServices;
