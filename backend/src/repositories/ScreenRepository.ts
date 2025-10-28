import { AppDataSource } from "../db/date-source";
import { Screen } from "../entities/Screen";

export const ScreenRepository = AppDataSource.getRepository(Screen);