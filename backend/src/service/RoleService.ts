import { Repository } from 'typeorm';
import { roleResponseDTO } from '../dtos/responses/role/roleResponseDTO';
import { userPermissionResponseDTO } from '../dtos/responses/role/userPermissionResponseDTO';
import { IRoleService } from '../interfaces/services/IRoleService';
import { Role } from '../entities/Role';
import { UserAccount } from '../entities/UserAccount';

export class RoleService implements IRoleService{
    
    constructor(
        private userRepository: Repository<UserAccount>, 
        private roleRepository: Repository<Role>
    ){}

    public async getPermissionByUserId(userAccountId: number): Promise<userPermissionResponseDTO>{
        const findUser = await this.userRepository.findOne({
            where: {userAccountId: userAccountId}
        });

        if(!findUser)
            throw new Error("Nenhum usuário encontrado");

        const findRole = await this.roleRepository.findOne({
            where: { roleId: findUser.roleId },
            relations: {
                roleScreens: { screen: true },
                roleScreenFunctions: { screenFunction: { screen: true } }
            }
        });

        if (!findRole) 
            throw new Error("Nenhuma função de usuário foi encontrada");

        const screens = (findRole.roleScreens ?? []).map(rs => {
            const screenFunctions = (findRole.roleScreenFunctions ?? [])
            .filter(rsf => rsf.screenFunction.screen.screenId === rs.screen.screenId)
            .map(rsf => ({
                screenFunctionId: rsf.screenFunction.screenFunctionId,
                name: rsf.screenFunction.name,
                description: rsf.screenFunction.description
            }));

            return {
                screenId: rs.screen.screenId,
                name: rs.screen.name,
                icon: rs.screen.icon,
                path: rs.screen.path,
                screenFunctions
            };
        });

        const response: userPermissionResponseDTO = {
            roleId: findRole.roleId,
            name: findRole.name,
            screens
        };

        return response;
    }
        
    public async getAll(): Promise<roleResponseDTO[]>{
        const getall = await this.roleRepository.find();

        const result: Array<roleResponseDTO> = getall.map((item) => ({
            roleId: item.roleId,
            name: item.name
        }));

        return result;
    }
}