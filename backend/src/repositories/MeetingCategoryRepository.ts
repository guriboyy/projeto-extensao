import { AppDataSource } from "../db/date-source";
import { MeetingCategory } from "../entities/MeetingCategory";

export const MeetingCategoryRepository = AppDataSource.getRepository(MeetingCategory);