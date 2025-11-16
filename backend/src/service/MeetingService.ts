import { Repository } from "typeorm";
import { meetingResponseDTO } from "../dtos/responses/meeting/meetingResponseDTO";
import { IMeetingService } from "../interfaces/services/IMeetingService";
import { Meeting } from "../entities/Meeting";
import { UserAccount } from "../entities/UserAccount";
import { createMeetingResponseDTO } from "../dtos/requests/meeting/createMeetingRequestDTO";
import { updateMeetingResponseDTO } from "../dtos/requests/meeting/updateMeetingRequestDTO";
import { mySchedulesResponseDTO } from "../dtos/responses/meeting/mySchedulesResponseDTO";

export class MeetingService implements IMeetingService{

    constructor(
        private meetingRepository: Repository<Meeting>,
        private userRepository: Repository<UserAccount>
    ){}

    public async createMeeting(meetingRequest: createMeetingResponseDTO): Promise<string>{
        const findLeaderUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.leaderAccountId}});
        const findGospelUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.gospelUserAccountId}});
        const findVibrationUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.vibrationUserAccountId }});
        const findFrontDeskUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.frontDeskUserAccountId}});
        const findReadingUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.readingUserAccountId}});
        const findPassManagerUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.passManagerUserAccountId}});
        const findSoundAndImageUserAccoount = await this.userRepository.findOne({where: {userAccountId: meetingRequest.soundAndImageUserAccountId}});

        const [datePart, timePart] = meetingRequest.meetingDate.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map(Number);
        const localDate = new Date(year, month - 1, day, hour, minute);

        if(!findLeaderUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser o Dirigente");

        if(!findGospelUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser do Evangelho");

        if(!findVibrationUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser das Vibrações");

        if(!findFrontDeskUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser da Recepção/Fila");
        
        if(!findReadingUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser da Leitura");

        if(!findPassManagerUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser o Dirigente Passe");

        if(!findSoundAndImageUserAccoount)
            throw new Error("Não foi possível encontrar o usuário para ser o SOM/IMAGEM");        

        const createMeeting = this.meetingRepository.create({
            titleMeeting: meetingRequest.titleMeeting.trim(),
            leaderUserAccountId: findLeaderUserAccoount.userAccountId,
            gospelUserAccountId: findGospelUserAccoount.userAccountId,
            vibrationUserAccountId: findVibrationUserAccoount.userAccountId,
            frontDeskUserAccountId: findFrontDeskUserAccoount.userAccountId,
            readingUserAccountId: findReadingUserAccoount.userAccountId,
            passManagerUserAccountId: findPassManagerUserAccoount.userAccountId,
            soundAndImageUserAccountId: findSoundAndImageUserAccoount.userAccountId,
            themeGospel: meetingRequest.themeGospel,
            meetingDate: localDate
        });

        await this.meetingRepository.save(createMeeting);
        return "Reunião criada com sucesso";
    }


    public async mySchedules(userAccuntId: number): Promise<mySchedulesResponseDTO[]>{
        const findUserAccount = await this.userRepository.findOne({
            where: {userAccountId: userAccuntId}
        });

        if(!findUserAccount)
            throw new Error("Nenhum usuário foi encontrado com este Id");

        const mySchedules = await this.meetingRepository
            .createQueryBuilder('meeting')
            .innerJoinAndSelect('meeting.leaderUserAccount', 'leader')
            .innerJoinAndSelect('meeting.gospelUserAccount', 'gospel')
            .innerJoinAndSelect('meeting.vibrationUserAccount', 'vibration')
            .innerJoinAndSelect('meeting.frontDeskUserAccount', 'frontDesk')
            .innerJoinAndSelect('meeting.readingUserAccount', 'reading')
            .innerJoinAndSelect('meeting.passManagerUserAccount', 'passManager')
            .innerJoinAndSelect('meeting.soundAndImageUserAccount', 'soundAndImage')
            .where(
                'meeting.leaderUserAccountId = :userAccountId OR ' +
                'meeting.gospelUserAccountId = :userAccountId OR ' +
                'meeting.vibrationUserAccountId = :userAccountId OR ' +
                'meeting.frontDeskUserAccountId = :userAccountId OR ' +
                'meeting.readingUserAccountId = :userAccountId OR ' +
                'meeting.passManagerUserAccountId = :userAccountId OR ' +
                'meeting.soundAndImageUserAccountId = :userAccountId',
                { userAccountId: findUserAccount.userAccountId }
            )
            .andWhere('meeting.meetingDate > :now', { now: new Date() })
            .getMany();

        const result: mySchedulesResponseDTO[] = mySchedules.map(item => {
            const roles = [
                { role: 'leader', id: item.leaderUserAccount.userAccountId },
                { role: 'gospel', id: item.gospelUserAccount.userAccountId },
                { role: 'vibration', id: item.vibrationUserAccount.userAccountId },
                { role: 'frontDesk', id: item.frontDeskUserAccount.userAccountId },
                { role: 'reading', id: item.readingUserAccount.userAccountId },
                { role: 'passManager', id: item.passManagerUserAccount.userAccountId },
                { role: 'soundAndImage', id: item.soundAndImageUserAccount.userAccountId },
            ];

            const myRole = roles.find(r => r.id === userAccuntId);

            return {
                meetingId: item.meetingId,
                meetingDate: item.meetingDate,
                role: myRole ? myRole.role : null
            };
        });

        return result.filter(r => r.role !== null);
    }


    public async getAllByCalendar(numberMonth: number): Promise<meetingResponseDTO[]>{
        const year = new Date().getFullYear();
        const startOfMonth = new Date(year, numberMonth - 1, 1, 0, 0, 0);
        const endOfMonth = new Date(year, numberMonth, 0, 23, 59, 59);

        const getallMeetings = await this.meetingRepository
            .createQueryBuilder('meeting')
            .innerJoinAndSelect('meeting.leaderUserAccount', 'leader')
            .innerJoinAndSelect('meeting.gospelUserAccount', 'gospel')
            .innerJoinAndSelect('meeting.vibrationUserAccount', 'vibration')
            .innerJoinAndSelect('meeting.frontDeskUserAccount', 'frontDesk')
            .innerJoinAndSelect('meeting.readingUserAccount', 'reading')
            .innerJoinAndSelect('meeting.passManagerUserAccount', 'passManager')
            .innerJoinAndSelect('meeting.soundAndImageUserAccount', 'soundAndImage')
            .where('meeting.meetingDate BETWEEN :startOfMonth AND :endOfMonth', { startOfMonth, endOfMonth })
            .getMany();

        const resultFormatted = await getallMeetings.map((item) => ({
            titleMeeting: item.titleMeeting,
            meetingId: item.meetingId,
            meetingDate: item.meetingDate,
            themeGospel: item.themeGospel,
            leader: {
                userAccountId: item.leaderUserAccount.userAccountId,
                name: item.leaderUserAccount.lastName + " " + item.leaderUserAccount.lastName
            },
            gospel: {
                userAccountId: item.gospelUserAccount.userAccountId,
                name: item.gospelUserAccount.lastName + " " + item.gospelUserAccount.lastName
            },
            vibration: {
                userAccountId: item.vibrationUserAccount.userAccountId,
                name: item.vibrationUserAccount.lastName + " " + item.vibrationUserAccount.lastName
            },
            frontDesk: {
                userAccountId: item.frontDeskUserAccount.userAccountId,
                name: item.frontDeskUserAccount.lastName + " " + item.frontDeskUserAccount.lastName
            },
            reading: {
                userAccountId: item.readingUserAccount.userAccountId,
                name: item.readingUserAccount.lastName + " " + item.readingUserAccount.lastName
            },
            passManager: {
                userAccountId: item.passManagerUserAccount.userAccountId,
                name: item.passManagerUserAccount.lastName + " " + item.passManagerUserAccount.lastName
            },
            soundAndImage: {
                userAccountId: item.soundAndImageUserAccount.userAccountId,
                name: item.soundAndImageUserAccount.lastName + " " + item.soundAndImageUserAccount.lastName
            }
        }));

        return resultFormatted;
    }

    public async update(meetingId: number, meetingRequest: updateMeetingResponseDTO): Promise<string>{
        const findMeeting = await this.meetingRepository.findOne({where: {meetingId: meetingId}});

        if(!findMeeting)
            throw new Error("Nenhuma reunião foi encontrada");


        const [datePart, timePart] = meetingRequest.meetingDate.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map(Number);
        const localDate = new Date(year, month - 1, day, hour, minute);

        if(meetingRequest.meetingDate != null){
            findMeeting.meetingDate = localDate;
        }

        if(meetingRequest.titleMeeting != null && meetingRequest.titleMeeting.trim() != ""){
            findMeeting.titleMeeting = meetingRequest.titleMeeting.trim();
        }

        if(meetingRequest.leaderUserAccountId && meetingRequest.leaderUserAccountId != findMeeting.leaderUserAccountId){
            const existThisLeader = await this.userRepository.findOne({where: {userAccountId: meetingRequest.leaderUserAccountId}});
            if(!existThisLeader)
                throw new Error("Este usuário para Dirigente não existe");
            findMeeting.leaderUserAccountId = meetingRequest.leaderUserAccountId;
        }

        if(meetingRequest.gospelUserAccountId && meetingRequest.gospelUserAccountId != findMeeting.gospelUserAccountId){
            const existThisGospel = await this.userRepository.findOne({where: {userAccountId: meetingRequest.gospelUserAccountId}});
            if(!existThisGospel)
                throw new Error("Este usuário para o Evangelho não existe");
            findMeeting.gospelUserAccountId = meetingRequest.gospelUserAccountId;
        }

        if(meetingRequest.vibrationUserAccountId && meetingRequest.vibrationUserAccountId != findMeeting.vibrationUserAccountId){
            const existThisVibration = await this.userRepository.findOne({where: {userAccountId: meetingRequest.vibrationUserAccountId}});
            if(!existThisVibration)
                throw new Error("Este usuário para Vibrações não existe");
            findMeeting.vibrationUserAccountId = meetingRequest.vibrationUserAccountId;
        }

        if(meetingRequest.frontDeskUserAccountId && meetingRequest.frontDeskUserAccountId != findMeeting.frontDeskUserAccountId){
            const existThisFrontDesk = await this.userRepository.findOne({where: {userAccountId: meetingRequest.frontDeskUserAccountId}});
            if(!existThisFrontDesk)
                throw new Error("Este usuário para Recepção não existe");
            findMeeting.frontDeskUserAccountId = meetingRequest.frontDeskUserAccountId;
        }

        if(meetingRequest.readingUserAccountId && meetingRequest.readingUserAccountId != findMeeting.readingUserAccountId){
            const existThisReading = await this.userRepository.findOne({where: {userAccountId: meetingRequest.readingUserAccountId}});
            if(!existThisReading)
                throw new Error("Este usuário para Leitura não existe");
            findMeeting.readingUserAccountId = meetingRequest.readingUserAccountId;
        }     
        
        if(meetingRequest.passManagerUserAccountId && meetingRequest.passManagerUserAccountId != findMeeting.passManagerUserAccountId){
            const existThisPassManager = await this.userRepository.findOne({where: {userAccountId: meetingRequest.passManagerUserAccountId}});
            if(!existThisPassManager)
                throw new Error("Este usuário para Dirigente passe não existe");
            findMeeting.passManagerUserAccountId = meetingRequest.passManagerUserAccountId;
        }

        if(meetingRequest.soundAndImageUserAccountId && meetingRequest.soundAndImageUserAccountId != findMeeting.soundAndImageUserAccountId){
            const existThisSoundAndImage = await this.userRepository.findOne({where: {userAccountId: meetingRequest.soundAndImageUserAccountId}});
            if(!existThisSoundAndImage)
                throw new Error("Este usuário para Som/Imagem passe não existe");
            findMeeting.soundAndImageUserAccountId = meetingRequest.soundAndImageUserAccountId;
        }    
        
        if(meetingRequest.themeGospel && meetingRequest.themeGospel != findMeeting.themeGospel){
            findMeeting.themeGospel = meetingRequest.themeGospel;
        }  

        await this.meetingRepository.save(findMeeting);

        return "Reunião editada com sucesso";
    }

    public async delete(meetingId: number): Promise<string>{
        const findMeeting = await this.meetingRepository.findOne({
            where: {meetingId: meetingId}
        });

        if(!findMeeting)
            throw new Error("Reunião não encontrada");

        await this.meetingRepository.remove(findMeeting);

        return "Reunião deletada com sucesso";
    }

    public async getById(meetingId: number): Promise<meetingResponseDTO>{
        const findMeeting = await this.meetingRepository.findOne({
            where: {meetingId: meetingId},
            relations: {
                leaderUserAccount: true,
                gospelUserAccount: true,
                vibrationUserAccount: true,
                frontDeskUserAccount: true,
                readingUserAccount: true,
                passManagerUserAccount: true,
                soundAndImageUserAccount: true
            }
        });

        if(!findMeeting)
            throw new Error("Reunião não encontrada");

        const resultFormatted = {
            titleMeeting: findMeeting.titleMeeting,
            meetingId: findMeeting.meetingId,
            meetingDate: findMeeting.meetingDate,
            themeGospel: findMeeting.themeGospel,
            leader: {
                userAccountId: findMeeting.leaderUserAccount.userAccountId,
                name: findMeeting.leaderUserAccount.lastName + " " + findMeeting.leaderUserAccount.lastName
            },
            gospel: {
                userAccountId: findMeeting.gospelUserAccount.userAccountId,
                name: findMeeting.gospelUserAccount.lastName + " " + findMeeting.gospelUserAccount.lastName
            },
            vibration: {
                userAccountId: findMeeting.vibrationUserAccount.userAccountId,
                name: findMeeting.vibrationUserAccount.lastName + " " + findMeeting.vibrationUserAccount.lastName
            },
            frontDesk: {
                userAccountId: findMeeting.frontDeskUserAccount.userAccountId,
                name: findMeeting.frontDeskUserAccount.lastName + " " + findMeeting.frontDeskUserAccount.lastName
            },
            reading: {
                userAccountId: findMeeting.readingUserAccount.userAccountId,
                name: findMeeting.readingUserAccount.lastName + " " + findMeeting.readingUserAccount.lastName
            },
            passManager: {
                userAccountId: findMeeting.passManagerUserAccount.userAccountId,
                name: findMeeting.passManagerUserAccount.lastName + " " + findMeeting.passManagerUserAccount.lastName
            },
            soundAndImage: {
                userAccountId: findMeeting.soundAndImageUserAccount.userAccountId,
                name: findMeeting.soundAndImageUserAccount.lastName + " " + findMeeting.soundAndImageUserAccount.lastName
            }
        } as meetingResponseDTO;

        return resultFormatted;
    }
}