import { AppDataSource } from "../db/date-source";
import { EventBoard } from "../entities/EventBoard";

export const EventBoardRepository = AppDataSource.getRepository(EventBoard);