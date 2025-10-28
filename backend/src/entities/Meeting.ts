import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";
import { MeetingCategory } from "./MeetingCategory";

@Entity({name: "Meeting"})
export class Meeting {

    @PrimaryGeneratedColumn({name: "MeetingId"})
    MeetingId: number;

    @Column({name: "MeetingDate", nullable: false, type: "timestamp"})
    meetingDate: Date;

    @Column({name: "UserAccountId", nullable: true, type: "int"})
    userAccountId?: number;

    @Column({name: "MeetingCategoryId", nullable: false, type: "int"})
    meetingCategoryId: number;

    @Column({name: "Description", nullable: true, type: "varchar"})
    description?: string;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.meetings)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount: UserAccount;

    @ManyToOne(() => MeetingCategory, (meetingCategory) => meetingCategory.meetings)
    @JoinColumn({
        name: "MeetingCategoryId",
        referencedColumnName: "meetingCategoryId"
    })
    meetingCategory: MeetingCategory;
}