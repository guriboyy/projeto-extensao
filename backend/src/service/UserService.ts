import { Repository } from "typeorm";
import { userAccountResponseDTO } from "../dtos/responses/userAccount/userAccountRespondeDTO";
import { IUserService } from "../interfaces/services/IUserService";
import { UserAccount } from "../entities/UserAccount";
import { userRequestDTO } from "../dtos/requests/user/userRequestDTO";
import { IEncryptionGateway } from "../interfaces/gateways/IEncryptionGateway";
import { Role } from "../entities/Role";
import { userUpdateRequestDTO } from "../dtos/requests/user/userUpdateRequestDTO";

export class UserService implements IUserService{

    constructor(
        private userRepository: Repository<UserAccount>,
        private roleRepository: Repository<Role>,
        private cryptographyGateway: IEncryptionGateway
    ){}

    public async create(body: userRequestDTO): Promise<void>{
        const existEmail = await this.userRepository.findOne({where:{email: body.email}});
        const existRole = await this.roleRepository.findOne({where:{roleId: body.roleId}});

        if(existEmail)
            throw new Error("Já existe um usuário com este email cadastrado");

        if(!existRole)
            throw new Error("Não existe esta função de usuário para adicionar ao usuário");

        if(body.firstName.length > 150)
            throw new Error("O campo de nome excedeu o tamanho máximo de 150 caracteres");
        
        if(body.lastName.length > 150)
            throw new Error("O campo de sobrenome excedeu o tamanho máximo de 150 caracteres");

        if(body.email.length > 150)
            throw new Error("O campo de email excedeu o tamanho máximo de 150 caracteres");

        if(body.password.length > 255)
            throw new Error("O campo de senha excedeu o tamanho máximo de 255 caracteres");

        if(body.phoneNumber?.length > 30)
            throw new Error("O campo de número de contato excedeu o tamanho máximo de 150 caracteres");

        const encryptPass = await this.cryptographyGateway.encrypt(body.password);
        const user = this.userRepository.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: encryptPass,
            phoneNumber: body.phoneNumber,
            roleId: body.roleId,
            isActive: body.isActive ?? true,
        });

        await this.userRepository.save(user);
    }
    
    public async getById(id: number): Promise<userAccountResponseDTO>{
        const finUser = await this.userRepository.findOne({
                where: {userAccountId: id},
                relations: {
                    role: true  
                }
            },
        );
        
        if(!finUser)
            throw new Error("Nenhum usuário encontrado com este Id");

        const result: userAccountResponseDTO = {
            userAccountId: finUser.userAccountId,
            firstName: finUser.firstName,
            lastName: finUser.lastName,
            email: finUser.email,
            phoneNumber: finUser.phoneNumber,
            isActive: finUser.isActive,
            role: {
                roleId: finUser.role.roleId,
                name: finUser.role.name,
            },
            createdAt: finUser.createdAt,
            updatedAt: finUser.updatedAt
        }; 

        return result;
    }

    public async getAll(): Promise<Array<userAccountResponseDTO>>{
        const getAllUsers = await this.userRepository.find({
            relations: {
                role: true  
            }
        });

        const result: Array<userAccountResponseDTO> = getAllUsers.map((item) => ({
            userAccountId: item.userAccountId,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            isActive: item.isActive,
            role: {
                roleId: item.role.roleId,
                name: item.role.name,
            },
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));

        return result;
    }

    public async update(userAccountId: number, userAccountRequest: userUpdateRequestDTO): Promise<string>{
        const findUser = await this.userRepository.findOne({
                where: {userAccountId: userAccountId},
                relations: {
                    role: true  
                }
            },
        );
        
        if(!findUser)
            throw new Error("Nenhum usuário encontrado com este Id");

        if(userAccountRequest.firstName && userAccountRequest.firstName != findUser.firstName){
            if(userAccountRequest.firstName.length > 150)
                throw new Error("O campo de nome excedeu o tamanho máximo de 150 caracteres");
            findUser.firstName = userAccountRequest.firstName.trim();
        }

        if(userAccountRequest.lastName && userAccountRequest.lastName != findUser.lastName){
            if(userAccountRequest.lastName.length > 150)
                throw new Error("O campo de sobrenome excedeu o tamanho máximo de 150 caracteres");
            findUser.lastName = userAccountRequest.lastName.trim();
        }

        if(userAccountRequest.email && userAccountRequest.email != findUser.email){
            if(userAccountRequest.email.length > 150)
                throw new Error("O campo de email excedeu o tamanho máximo de 150 caracteres");
            findUser.email = userAccountRequest.email.trim();
        }

        if (userAccountRequest.phoneNumber !== undefined && userAccountRequest.phoneNumber !== findUser.phoneNumber) {
            if (userAccountRequest.phoneNumber && userAccountRequest.phoneNumber.length > 30)
                throw new Error("O campo de número de contato excedeu o tamanho máximo de 30 caracteres");
            findUser.phoneNumber = userAccountRequest.phoneNumber ? userAccountRequest.phoneNumber.trim() : null;
        }

        if (userAccountRequest.roleId !== undefined && userAccountRequest.roleId !== findUser.roleId) {
            const findRole = await this.roleRepository.findOne({ where: { roleId: userAccountRequest.roleId } });

            if (!findRole)
                throw new Error("Esta role não foi encontrada");

            findUser.role = findRole;
        }

        if (userAccountRequest.isActive !== undefined && userAccountRequest.isActive !== findUser.isActive) {
            findUser.isActive = userAccountRequest.isActive;
        }

        findUser.updatedAt = new Date();

        await this.userRepository.save(findUser);

        return "Usuário editado com sucesso";
    }
}