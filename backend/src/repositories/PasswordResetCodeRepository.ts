import { AppDataSource } from "../db/data-source";
import { PasswordResetCode } from "../entities/PasswordResetCode";

export const PasswordResetCodeRepository = AppDataSource.getRepository(PasswordResetCode);