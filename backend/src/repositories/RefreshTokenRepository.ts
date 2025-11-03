import { AppDataSource } from "../db/data-source";
import { RefreshToken } from "../entities/RefreshToken";

export const RefreshTokenRepository = AppDataSource.getRepository(RefreshToken);