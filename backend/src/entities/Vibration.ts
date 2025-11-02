import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: "Vibration"})
export class Vibration {

    @PrimaryGeneratedColumn({name: "VibrationId"})
    vibrationId: number;

    @Column({name: "UserAccountId", nullable: true, type: "int"})
    userAccountId?: number;

    @Column({name: "Reason", nullable: false, type: "text"})
    reason: string;

    @CreateDateColumn({name: "CreatedAt", nullable: false})
    createdAt: Date;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.vibrations)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount?: UserAccount;
}