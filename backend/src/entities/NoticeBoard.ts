import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: "NoticeBoard"})
export class NoticeBoard {

    @PrimaryGeneratedColumn({name: "NoticeBoardId"})
    noticeBoardId: number;

    @Column({name: "Description", nullable: false, type: "varchar"})
    description: string;

    @Column({name: "UserAccountId", nullable: true, type: "int"})
    userAccountId?: number;

    @CreateDateColumn({name: "PostedDate", nullable: false})
    postedDate: Date;

    @Column({name: "EndDate", nullable: true, type: "timestamp"})
    endDate?: Date;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.noticeBoards)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount: UserAccount;
}