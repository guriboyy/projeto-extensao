import { AppDataSource } from "../db/date-source";
import { Meeting } from "../entities/Meeting";

export const MeetingRepository = AppDataSource.getRepository(Meeting);