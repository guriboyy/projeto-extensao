import { AppDataSource } from "../db/date-source";
import { RoleScreen } from "../entities/RoleScreen";

export const RoleScreenRepository = AppDataSource.getRepository(RoleScreen);