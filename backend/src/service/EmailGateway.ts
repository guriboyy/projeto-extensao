import { Transporter, createTransport } from "nodemailer";
import { IEmailGateway } from "../interfaces/gateways/IEmailGateway";
import juice from "juice";

export class EmailGateway implements IEmailGateway{
    private trasnporter: Transporter;
    private emailSupportAPP: string;
    private SMTM: string;
    private PORT: number
    private passSupportAPP: string;

    constructor(){
        this.SMTM = process.env.EMAIL_SMTP;
        this.emailSupportAPP = process.env.EMAIL_SUPPORT_APP;
        this.PORT = parseInt(process.env.EMAIL_PORT);
        this.passSupportAPP = process.env.PASS_SUPPORT_APP;

        this.trasnporter = createTransport({
            host: this.SMTM,
            port: this.PORT,
            secure: false,
            auth: {
              user: this.emailSupportAPP,
              pass: this.passSupportAPP,
            }
        });
    }

    public async sendEmail(receiveEmail: string, subject?:string, text?: string, html?:string): Promise<string>{
        var mailOptions = {
            from: this.emailSupportAPP,
            to: receiveEmail,
            subject: subject,
            text: text,
            html: juice(html),
        };

        try {
            const info = await this.trasnporter.sendMail(mailOptions);
            return "Um código de validação foi enviado no seu email";
        } catch (error) {
            throw new Error("Falha ao enviar o código de recuperação de senha no seu email");
        }
    }
}