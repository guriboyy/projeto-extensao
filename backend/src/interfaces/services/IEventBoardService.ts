import { createEventBoardRequestDTO } from "../../dtos/requests/eventBoard/createEventBoardRequestDTO";
import { updateEventBoardRequestDTO } from "../../dtos/requests/eventBoard/updateEventBoardRequestDTO";
import { eventBoardResponseDTO } from "../../dtos/responses/eventBoard/eventBoardResponseDTO";

export interface IEventBoardService {
    create: (requestBody: createEventBoardRequestDTO) => Promise<string>;
    update: (eventBoardId: number, requestBody: updateEventBoardRequestDTO) => Promise<string>;
    delete: (eventBoardId: number) => Promise<string>;
    getAll: () => Promise<eventBoardResponseDTO[]>;
    getById: (eventBoardId: number) => Promise<eventBoardResponseDTO>;
}