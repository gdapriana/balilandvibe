import { Destination } from "@prisma/client";
import validation from "../validation/validation";
import DestinaionValidation from "../validation/destinaion-validation";
import slugify from "slugify";
import db from "../application/database";
import ResponseError from "../error/response-error";
import { Queries } from "../types";

class DestinationServices {
  static async create(body: Destination) {
    const bodyCheck = validation.validate(DestinaionValidation.CREATE, body);
    const slug: string = slugify(bodyCheck.name, { lower: true });
    const isItemExit: Destination | null = await db.destination.findFirst({ where: { slug } });
    if (isItemExit) throw new ResponseError(400, "already exist");
    return db.destination.create({
      data: { ...bodyCheck, slug },
      select: {
        name: true,
      },
    });
  }
  static async get(slug: string) {
    const item = await db.destination.findUnique({
      where: { slug },
      include: {
        _count: true,
        district: {
          select: {
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        sources: true,
      },
    });
    if (!item) throw new ResponseError(404, "not found");
    return item;
  }
  static async gets(queries: Queries) {
    const queriesCheck = validation.validate(DestinaionValidation.GET_QUERIES, queries);
    if (queriesCheck.page && queriesCheck.take) throw new ResponseError(400, "page and count query cannot be merged");
    let cat: { categorySlug: string }[] = [];
    let dis: { districtSlug: string }[] = [];
    if (queriesCheck.category) {
      for (const cate of queriesCheck.category) {
        cat.push({ categorySlug: cate });
      }
    }
    if (queriesCheck.district) {
      for (const dist of queriesCheck.district) {
        dis.push({ districtSlug: dist });
      }
    }
    const totalItems = await db.destination.count();
    const perPageItems = await db.destination.count({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { address: { contains: queriesCheck.address, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
          { OR: cat },
          { OR: dis },
        ],
      },
      orderBy: {
        viewed: queriesCheck.sort === "viewed" ? "desc" : undefined,
        name: queriesCheck.sort === "name" ? "desc" : undefined,
        price: queriesCheck.sort === "price" ? "desc" : undefined,
      },
      take:
        queriesCheck.page && Number(queriesCheck.page) !== 0
          ? 10
          : queriesCheck.take && Number(queriesCheck.take)
            ? Number(queriesCheck.take)
            : undefined,
      skip: queriesCheck.page && Number(queriesCheck.page) !== 0 ? Number(queriesCheck.page) * 10 - 10 : undefined,
    });
    const items = await db.destination.findMany({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { address: { contains: queriesCheck.address, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
          { OR: cat },
          { OR: dis },
        ],
      },
      orderBy: {
        viewed: queriesCheck.sort === "viewed" ? "desc" : undefined,
        name: queriesCheck.sort === "name" ? "asc" : undefined,
        price: queriesCheck.sort === "price" ? "desc" : undefined,
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
        price: true,
        viewed: true,
        description: true,
        district: {
          select: {
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return {
      totalItems,
      perPageItems,
      items,
    };
  }
  static async update(body: Destination, slug: string) {
    const bodyCheck = validation.validate(DestinaionValidation.UPDATE, body);
    const isItemExists = await db.destination.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    if (bodyCheck.name) {
      const newSlug: string = slugify(bodyCheck.name, { lower: true });
      const itemAlreadyExist = await db.destination.findUnique({ where: { slug: newSlug } });
      if (itemAlreadyExist) throw new ResponseError(400, "already exists");
      return db.destination.update({ where: { slug }, data: { ...bodyCheck, slug: newSlug } });
    }
    return db.destination.update({ where: { slug }, data: bodyCheck });
  }
  static async updateView(slug: string) {
    const isItemExist = await db.destination.findUnique({ where: { slug } });
    if (!isItemExist) throw new ResponseError(404, "not found");
    const currentView: number = isItemExist.viewed;
    return db.destination.update({
      where: { slug },
      data: {
        viewed: currentView + 1,
      },
      select: { name: true },
    });
  }
  static async delete(slug: string) {
    const isDestinationExists = await db.destination.findUnique({ where: { slug } });
    if (!isDestinationExists) throw new ResponseError(404, "destination not found");
    return db.destination.delete({ where: { slug }, select: { name: true } });
  }
}

export default DestinationServices;
