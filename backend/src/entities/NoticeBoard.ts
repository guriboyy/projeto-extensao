import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: "NoticeBoard"})
export class NoticeBoard {

    @PrimaryGeneratedColumn({name: "NoticeBoardId"})
    noticeBoardId: number;

    @Column({name: "Description", nullable: false, type: "varchar"})
    description: string;

    @Column({name: "UserAccountId", nullable: false, type: "int"})
    userAccountId: number;

    @CreateDateColumn({name: "PostedDate", nullable: false, type: "datetime"})
    postedDate: Date;

    @Column({name: "EndDate", nullable: true, type: "datetime"})
    endDate?: Date;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.noticeBoards)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount: UserAccount;
}