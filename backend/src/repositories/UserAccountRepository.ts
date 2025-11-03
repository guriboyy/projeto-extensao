import { AppDataSource } from "../db/data-source";
import { UserAccount } from "../entities/UserAccount";

export const UserAccountRepository = AppDataSource.getRepository(UserAccount);