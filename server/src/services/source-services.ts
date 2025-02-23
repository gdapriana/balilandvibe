import { Source } from "@prisma/client";
import validation from "../validation/validation";
import SourceValidation from "../validation/source-validation";
import db from "../application/database";
import ResponseError from "../error/response-error";

class SourceService {
  static async create(body: Source) {
    const bodyCheck = validation.validate(SourceValidation.CREATE, body);
    return db.source.create({
      data: body,
      select: { id: true },
    });
  }
  static async update(body: Source, id: string) {
    const isItemExists = await db.source.findFirst({ where: { id } });
    if (!isItemExists) throw new ResponseError(404, "not found");
    const bodyCheck = validation.validate(SourceValidation.UPDATE, body);
    return db.source.update({
      where: { id },
      data: bodyCheck,
    });
  }
  static async delete(id: string) {
    const istItemExists = await db.source.findFirst({ where: { id } });
    if (!istItemExists) throw new ResponseError(404, "not found");
    return db.source.delete({
      where: { id },
      select: { name: true },
    });
  }
}

export default SourceService;
