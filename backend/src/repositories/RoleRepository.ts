import { AppDataSource } from "../db/date-source";
import { Role } from "../entities/Role";

export const RoleRepository = AppDataSource.getRepository(Role);