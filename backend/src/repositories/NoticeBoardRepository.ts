import { AppDataSource } from "../db/data-source";
import { NoticeBoard } from "../entities/NoticeBoard";

export const NoticeBoardRepository = AppDataSource.getRepository(NoticeBoard);