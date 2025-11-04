import { createNoticeBoardRequestDTO } from "../../dtos/requests/noticeBoard/createNoticeBoardRequestDTO";
import { updateNoticeBoardRequestDTO } from "../../dtos/requests/noticeBoard/updateNoticeBoardRequestDTO";
import { noticeBoardResponseDTO } from "../../dtos/responses/noticeBoard/noticeBoardResponseDTO";

export interface INoticeBoardService{
    create: (userAccountId: number, notificationRequest: createNoticeBoardRequestDTO) => Promise<string>;
    getAll: () => Promise<noticeBoardResponseDTO[]>;
    getById: (noticeBoardId: number) => Promise<noticeBoardResponseDTO>;
    update: (noticeBoardId: number, noticeBoardRequest: updateNoticeBoardRequestDTO) => Promise<string>;
    delete: (noticeBoardId: number) => Promise<string>;
}