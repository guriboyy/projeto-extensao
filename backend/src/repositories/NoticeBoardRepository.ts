import { AppDataSource } from "../db/date-source";
import { NoticeBoard } from "../entities/NoticeBoard";

export const NoticeBoardRepository = AppDataSource.getRepository(NoticeBoard);