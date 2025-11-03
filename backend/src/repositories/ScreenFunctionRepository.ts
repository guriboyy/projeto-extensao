import { AppDataSource } from "../db/data-source";
import { ScreenFunction } from "../entities/ScreenFunction";

export const ScreenFunctionRepository = AppDataSource.getRepository(ScreenFunction);