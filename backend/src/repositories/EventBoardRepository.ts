import { AppDataSource } from "../db/data-source";
import { EventBoard } from "../entities/EventBoard";

export const EventBoardRepository = AppDataSource.getRepository(EventBoard);