import { Repository } from "typeorm";
import { IEventBoardService } from "../interfaces/services/IEventBoardService";
import { EventBoard } from "../entities/EventBoard";
import { createEventBoardRequestDTO } from "../dtos/requests/eventBoard/createEventBoardRequestDTO";
import { updateEventBoardRequestDTO } from "../dtos/requests/eventBoard/updateEventBoardRequestDTO";
import { eventBoardResponseDTO } from "../dtos/responses/eventBoard/eventBoardResponseDTO";

export class EventBoardService implements IEventBoardService{
    constructor(
        private eventBoardRepository: Repository<EventBoard>
    ){}

    public async create(requestBody: createEventBoardRequestDTO): Promise<string>{
        if(requestBody.title.length > 150)
            throw new Error("O tamanho o título esta muito grande, no maxímo 150 caracteres");
    
        const [datePart, timePart] = requestBody.eventDate.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map(Number);
        const localDate = new Date(year, month - 1, day, hour, minute);

        const createEvent = this.eventBoardRepository.create({
            title: requestBody.title,
            description: requestBody.description ?? null,
            eventDate: localDate
        });

        await this.eventBoardRepository.save(createEvent);

        return "Evento criado com sucesso";
    }

    public async update(eventBoardId: number, requestBody: updateEventBoardRequestDTO): Promise<string>{
        const findEvent = await this.eventBoardRepository.findOne({where: {eventBoardId: eventBoardId}});
        if(!findEvent)
            throw new Error("Evento não encontrado");

        if(requestBody.title && requestBody.title != findEvent.title){
            findEvent.title = requestBody.title;
        }

        if(requestBody.description && requestBody.description != findEvent.description){
            findEvent.description = requestBody.description;
        }

        if(requestBody.eventDate != null){
            const [datePart, timePart] = requestBody.eventDate.split(" ");
            const [year, month, day] = datePart.split("-").map(Number);
            const [hour, minute] = timePart.split(":").map(Number);
            const localDate = new Date(year, month - 1, day, hour, minute);

            findEvent.eventDate = localDate;
        }         
        
        await this.eventBoardRepository.save(findEvent);

        return "Evento atualizado com sucesso";
    }

    public async delete (eventBoardId: number): Promise<string>{
        const findEvent = await this.eventBoardRepository.findOne({where: {eventBoardId: eventBoardId}});
        if(!findEvent)
            throw new Error("Evento não encontrado");

        await this.eventBoardRepository.remove(findEvent);

        return "Evento deletado com sucesso";
    }

    public async getAll(): Promise<eventBoardResponseDTO[]>{
        const results = await this.eventBoardRepository.find();

        const resultsFormatted = results.map((item) => ({
            eventBoardId: item.eventBoardId,
            title: item.title,
            description: item.description,
            eventDate: item.eventDate
        }));

        return resultsFormatted;
    }

    public async getById(eventBoardId: number): Promise<eventBoardResponseDTO>{
        const findEvent = await this.eventBoardRepository.findOne({where: {eventBoardId: eventBoardId}});
        if(!findEvent)
            throw new Error("Evento não encontrado");

        const resultFormatted = {
            eventBoardId: findEvent.eventBoardId,
            title: findEvent.title,
            description: findEvent.description,
            eventDate: findEvent.eventDate
        } as eventBoardResponseDTO;

        return resultFormatted;
    }
}