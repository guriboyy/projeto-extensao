import { Repository } from "typeorm";
import { IPasswordResetCodeService } from "../interfaces/services/IPasswordResetCodeService";
import { PasswordResetCode } from "../entities/PasswordResetCode";
import { IEncryptionGateway } from "../interfaces/gateways/IEncryptionGateway";
import { UserAccount } from "../entities/UserAccount";
import { IEmailGateway } from "../interfaces/gateways/IEmailGateway";
import { templateEmailHTML } from "../utils/templateEmailHTML";

export class PasswordResetCodeService implements IPasswordResetCodeService{

    private EXPIRATION_TIME: number = 5; //5 minutos

    constructor(
        private userAccountRepository: Repository<UserAccount>,
        private passwordResetCode: Repository<PasswordResetCode>,
        private crypographyGateway: IEncryptionGateway,
        private emailGateway: IEmailGateway
    ){}

    public async createCode(email: string): Promise<string>{
        const findUser = await this.userAccountRepository.findOne({where: {email}});
        
        if(!findUser)
            throw new Error("Falha ao enviar código de recuperação de senha ao usuário");

        const getLastCode = await this.passwordResetCode.findOne({
            where: {
                userAccountId: findUser.userAccountId
            },
            order: {
                passwordResetCodeId: "DESC"
            }
        });

        let dateNow  = new Date();
        if(getLastCode && dateNow < getLastCode.expirationDate && !getLastCode.isUsed)
            throw new Error(`Já foi enviado um código de validação do seu Email, por favor esperar ${this.EXPIRATION_TIME} minutos para solicitar um novo código`);

        const newCode = this.makeNewCode();
        const encrypetedCode = await this.crypographyGateway.encrypt(newCode);
        let expireDate = new Date(Date.now() + this.EXPIRATION_TIME * 60 * 1000);

        const createPasswordResetCode = this.passwordResetCode.create({
            code: encrypetedCode,
            userAccountId: findUser.userAccountId,
            expirationDate: expireDate
        });

        await this.userAccountRepository.save(createPasswordResetCode);

        const response = await this.emailGateway.sendEmail(findUser.email, "Redefinição de senha", "", templateEmailHTML(findUser.firstName + " " + findUser.lastName, newCode));
        return response;
    }

    public async validateCode(email: string, codeRaw: string): Promise<boolean>{
        const findUser = await this.userAccountRepository.findOne({where: {email}});
        
        if(!findUser)
            return false;

        const getLastCode = await this.passwordResetCode.findOne({
            where: {
                userAccountId: findUser.userAccountId
            },
            order: {
                passwordResetCodeId: "DESC"
            }
        });

        const dateNow = new Date();
        if(
            !getLastCode ||
            dateNow > getLastCode.expirationDate ||
            await this.crypographyGateway.match(codeRaw, getLastCode.code) ||
            getLastCode.isUsed
        )
            return false;


        return true;
    }


    public async resetPassword(email: string, newPassword: string, codeRaw: string): Promise<string>{
        const findUser = await this.userAccountRepository.findOne({where: {email}});

        if(!findUser)
            throw new Error("Código inválido ou expirado");


        const getLastCode = await this.passwordResetCode.findOne({
            where: {
                userAccountId: findUser.userAccountId
            },
            order: {
                passwordResetCodeId: "DESC"
            }
        });

        const isValidCode = await this.validateCode(email, codeRaw);

        if(!isValidCode || !getLastCode)
            throw new Error("Código inválido ou expirado");

        if(newPassword.length > 255)
            throw new Error("A nova senha excedeu o tamanho máximo de 255 caracteres");

        const encrypetedNewPassword = await this.crypographyGateway.encrypt(newPassword);
        findUser.password = encrypetedNewPassword;
        getLastCode.isUsed = true;

        await this.passwordResetCode.save(findUser);
        await this.passwordResetCode.save(getLastCode);

        return "Senha alterada com sucesso";
    }


    private makeNewCode(): string{
        let code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
}