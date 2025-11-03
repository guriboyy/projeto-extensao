import { AppDataSource } from "../db/data-source";
import { RoleScreen } from "../entities/RoleScreen";

export const RoleScreenRepository = AppDataSource.getRepository(RoleScreen);