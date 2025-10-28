import { AppDataSource } from "../db/date-source";
import { RoleScreenFunction } from "../entities/RoleScreenFunction";

export const RoleScreenFunctionRepository = AppDataSource.getRepository(RoleScreenFunction);