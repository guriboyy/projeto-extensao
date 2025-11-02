import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: 'PasswordResetCode'})
export class PasswordResetCode{

    @PrimaryGeneratedColumn({name: "PasswordResetCodeId"})
    passwordResetCodeId: number;
    
    @Column({name: "Code", type: "varchar", nullable: false})
    code: string;

    @Column({ name: "UserAccountId", type: "int", nullable: false })
    userAccountId: number;

    @CreateDateColumn({name: "CreatedAt", nullable: false, type: "datetime"})
    createdAt: Date;  
    
    @Column({name: "ExpirationDate", nullable: false, type: "datetime"})
    expirationDate: Date;  

    @Column({ name: "IsUsed", type: "boolean", default: false })
    isUsed: boolean;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.passwordResetCodes)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount: UserAccount;
}