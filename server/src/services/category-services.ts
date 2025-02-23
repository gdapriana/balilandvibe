import { Category } from "@prisma/client";
import validation from "../validation/validation";
import slugify from "slugify";
import db from "../application/database";
import ResponseError from "../error/response-error";
import { Queries } from "../types";
import CategoryValidation from "../validation/category-validation";

class CategoryServices {
  static async create(body: Category) {
    const bodyCheck = validation.validate(CategoryValidation.CREATE, body);
    const slug: string = slugify(bodyCheck.name, { lower: true });
    const isItemsExit: Category | null = await db.category.findFirst({ where: { slug } });
    if (isItemsExit) throw new ResponseError(400, "already exist");
    return db.category.create({
      data: { ...bodyCheck, slug },
      select: {
        name: true,
      },
    });
  }
  static async get(slug: string) {
    const items = await db.category.findUnique({
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
      },
    });
    if (!items) throw new ResponseError(404, "not found");
    return items;
  }
  static async gets(queries: Queries) {
    const queriesCheck = validation.validate(CategoryValidation.GET_QUERIES, queries);
    const totalItems = await db.category.count();
    const perPageItems = await db.category.count({
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
    const items = await db.category.findMany({
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
        name: true,
        slug: true,
      },
    });
    return {
      totalItems,
      perPageItems,
      items,
    };
  }
  static async update(body: Category, slug: string) {
    const bodyCheck = validation.validate(CategoryValidation.UPDATE, body);
    const isItemExists = await db.category.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    if (bodyCheck.name) {
      const newSlug: string = slugify(bodyCheck.name, { lower: true });
      const itemAlreadyExist = await db.category.findUnique({ where: { slug: newSlug } });
      if (itemAlreadyExist) throw new ResponseError(400, "already exists");
      return db.category.update({ where: { slug }, data: { ...bodyCheck, slug: newSlug } });
    }
    return db.category.update({ where: { slug }, data: bodyCheck });
  }
  static async delete(slug: string) {
    const isItemExists = await db.category.findUnique({ where: { slug } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    return db.category.delete({ where: { slug }, select: { name: true } });
  }
}

export default CategoryServices;
