import { AppDataSource } from "../db/date-source";
import { UserAccount } from "../entities/UserAccount";

export const UserAccountRepository = AppDataSource.getRepository(UserAccount);