import { AppDataSource } from "../db/data-source";
import { Meeting } from "../entities/Meeting";

export const MeetingRepository = AppDataSource.getRepository(Meeting);