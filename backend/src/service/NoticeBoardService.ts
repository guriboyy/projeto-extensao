import { Repository } from "typeorm";
import { INoticeBoardService } from "../interfaces/services/INoticeBoardService";
import { UserAccount } from "../entities/UserAccount";
import { NoticeBoard } from "../entities/NoticeBoard";
import { noticeBoardResponseDTO } from "../dtos/responses/noticeBoard/noticeBoardResponseDTO";
import { updateNoticeBoardRequestDTO } from "../dtos/requests/noticeBoard/updateNoticeBoardRequestDTO";
import { createNoticeBoardRequestDTO } from "../dtos/requests/noticeBoard/createNoticeBoardRequestDTO";

export class NoticeBoardService implements INoticeBoardService{

    constructor(
        private noticeBoardRepository: Repository<NoticeBoard>,
        private userAccountRepository: Repository<UserAccount>
    ){}

    public async create(userAccountId: number, notificationRequest: createNoticeBoardRequestDTO): Promise<string>{
        const findUser = await this.userAccountRepository.findOne({where: {userAccountId: userAccountId}});

        if(!findUser)
            throw new Error("Nenhum usuário foi encontrado com este Id");

        const createNotification = this.noticeBoardRepository.create({
            description: notificationRequest.description,
            userAccountId: userAccountId,
            endDate:  notificationRequest.endDate ?? null
        });

        await this.noticeBoardRepository.save(createNotification);

        return "Alerta criado com sucesso ao mural de avisos";
    }

    public async getAll(): Promise<noticeBoardResponseDTO[]>{
        const result = await this.noticeBoardRepository.find({
            relations: {
                userAccount: {
                    role: true
                }
            }
        });

        const resultFormatted = result.map((item) => ({
            noticeBoardId: item.noticeBoardId,
            description: item.description,
            userAccount: {
                userAccountId: item.userAccount.userAccountId,
                name: item.userAccount.firstName + " " + item.userAccount.lastName,
                role: item.userAccount.role.name
            },
            postedDate: item.postedDate,
            endDate: item.endDate
        }));

        return resultFormatted;
    }

    public async getById(noticeBoardId: number): Promise<noticeBoardResponseDTO>{
        const findNoticeBoard = await this.noticeBoardRepository.findOne({
            where: {noticeBoardId: noticeBoardId},
            relations: {
                userAccount: {
                    role: true
                }
            }
        });

        if(!findNoticeBoard)
            throw new Error("Não foi encontrado nenhum aviso com esse Id");

        const resultFormatted = {
            noticeBoardId: findNoticeBoard.noticeBoardId,
            description: findNoticeBoard.description,
            userAccount: {
                userAccountId: findNoticeBoard.userAccount.userAccountId,
                name: findNoticeBoard.userAccount.firstName + " " + findNoticeBoard.userAccount.lastName,
                role: findNoticeBoard.userAccount.role.name
            },
            postedDate: findNoticeBoard.postedDate,
            endDate: findNoticeBoard.endDate
        } as noticeBoardResponseDTO;

        return resultFormatted;
    }
    public async update(noticeBoardId: number, noticeBoardRequest: updateNoticeBoardRequestDTO): Promise<string>{
        const findNoticeBoard = await this.noticeBoardRepository.findOne({
            where: {noticeBoardId: noticeBoardId},
            relations: {
                userAccount: {
                    role: true
                }
            }
        });

        if(!findNoticeBoard)
            throw new Error("Não foi encontrado nenhum aviso com esse Id");

        if(noticeBoardRequest.description && noticeBoardRequest.description != findNoticeBoard.description){
            findNoticeBoard.description = noticeBoardRequest.description;
        }

        if(noticeBoardRequest.endDate && noticeBoardRequest.endDate != findNoticeBoard.endDate){
            findNoticeBoard.endDate = noticeBoardRequest.endDate;
        }
        
        await this.noticeBoardRepository.save(findNoticeBoard);

        return "Aviso editado com sucesso";
    }

    public async delete(noticeBoardId: number): Promise<string>{
        const findNoticeBoard = await this.noticeBoardRepository.findOne({
            where: {noticeBoardId: noticeBoardId}
        });

        if(!findNoticeBoard)
            throw new Error("Não foi encontrado nenhum aviso com esse Id");

        await this.noticeBoardRepository.remove(findNoticeBoard);

        return "Alerta deletado com sucesso";
    }
}