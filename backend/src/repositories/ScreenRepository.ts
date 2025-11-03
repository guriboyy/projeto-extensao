import { AppDataSource } from "../db/data-source";
import { Screen } from "../entities/Screen";

export const ScreenRepository = AppDataSource.getRepository(Screen);