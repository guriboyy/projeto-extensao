import { AppDataSource } from "../db/data-source";
import { RoleScreenFunction } from "../entities/RoleScreenFunction";

export const RoleScreenFunctionRepository = AppDataSource.getRepository(RoleScreenFunction);