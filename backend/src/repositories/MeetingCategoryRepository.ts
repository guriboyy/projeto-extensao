import { AppDataSource } from "../db/data-source";
import { MeetingCategory } from "../entities/MeetingCategory";

export const MeetingCategoryRepository = AppDataSource.getRepository(MeetingCategory);