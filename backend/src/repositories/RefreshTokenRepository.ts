import { AppDataSource } from "../db/date-source";
import { RefreshToken } from "../entities/RefreshToken";

export const RefreshTokenRepository = AppDataSource.getRepository(RefreshToken);