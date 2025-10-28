import { AppDataSource } from "../db/date-source";
import { ScreenFunction } from "../entities/ScreenFunction";

export const ScreenFunctionRepository = AppDataSource.getRepository(ScreenFunction);