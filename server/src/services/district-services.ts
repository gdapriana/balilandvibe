import { Category, District } from "@prisma/client";
import validation from "../validation/validation";
import slugify from "slugify";
import db from "../application/database";
import ResponseError from "../error/response-error";
import { Queries } from "../types";
import DistrictValidation from "../validation/district-validation";

class DistrictServices {
  static async create(body: District) {
    const bodyCheck = validation.validate(DistrictValidation.CREATE, body);
    const slug: string = slugify(bodyCheck.name, { lower: true });
    const isItemsExit: Category | null = await db.district.findFirst({ where: { slug } });
    if (isItemsExit) throw new ResponseError(400, "already exist");
    return db.district.create({
      data: { ...bodyCheck, slug },
      select: {
        name: true,
      },
    });
  }
  static async get(slug: string) {
    const items = await db.district.findUnique({
      where: { slug },
      include: {
        _count: true,
        destinations: {
          select: {
            id: true,
            name: true,
            slug: true,
            cover: true,
            description: true,
          },
        },
        traditions: {
          select: {
            id: true,
            name: true,
            slug: true,
            cover: true,
            description: true,
          },
        },
      },
    });
    if (!items) throw new ResponseError(404, "not found");
    return items;
  }
  static async gets(queries: Queries) {
    const queriesCheck = validation.validate(DistrictValidation.GET_QUERIES, queries);
    const totalItems = await db.district.count();
    const perPageItems = await db.district.count({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
        ],
      },
      orderBy: {
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
    const items = await db.district.findMany({
      where: {
        AND: [
          { name: { contains: queriesCheck.name, mode: "insensitive" } },
          { description: { contains: queriesCheck.description, mode: "insensitive" } },
        ],
      },
      orderBy: {
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
        _count: true,
        id: true,
        logo: true,
        name: true,
        slug: true,
        cover: true,
      },
    });
    return {
      totalItems,
      perPageItems,
      items,
    };
  }
  static async update(body: District, slug: string) {
    const bodyCheck = validation.validate(DistrictValidation.UPDATE, body);
    const isItemExists = await db.district.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    if (bodyCheck.name) {
      const newSlug: string = slugify(bodyCheck.name, { lower: true });
      const itemAlreadyExist = await db.district.findUnique({ where: { slug: newSlug } });
      if (itemAlreadyExist) throw new ResponseError(400, "already exists");
      return db.district.update({ where: { slug }, data: { ...bodyCheck, slug: newSlug } });
    }
    return db.district.update({ where: { slug }, data: bodyCheck });
  }
  static async delete(slug: string) {
    const isItemExists = await db.district.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    return db.district.delete({ where: { slug }, select: { name: true } });
  }
}

export default DistrictServices;
