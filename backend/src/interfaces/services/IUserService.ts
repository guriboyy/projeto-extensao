import { userRequestDTO } from "../../dtos/requests/user/userRequestDTO";
import { userAccountResponseDTO } from "../../dtos/responses/userAccount/userAccountRespondeDTO";
import { IGenericService } from "../generic/IGenericService";

export interface IUserService extends IGenericService<userRequestDTO, userAccountResponseDTO>{}