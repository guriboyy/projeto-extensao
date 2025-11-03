export interface IEmailGateway{
    sendEmail: (receiveEmail: string, subject?:string, text?: string, html?:string) => Promise<string>;
}