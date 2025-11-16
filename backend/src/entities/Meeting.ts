import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: "Meeting"})
export class Meeting {

    @PrimaryGeneratedColumn({name: "MeetingId"})
    meetingId: number;

    @Column({name: "TitleMeeting", nullable: false, type: "varchar"})
    titleMeeting: string;

    @Column({name: "MeetingDate", nullable: false, type: "timestamp"})
    meetingDate: Date;

    @Column({name: "LeaderUserAccountId", nullable: false, type: "int"})
    leaderUserAccountId: number;

    @Column({name: "GospelUserAccountId", nullable: false, type: "int"})
    gospelUserAccountId: number;

    @Column({name: "VibrationUserAccoundId", nullable: false, type: "int"})
    vibrationUserAccountId: number;

    @Column({name: "FrontDeskUserAccountId", nullable: false, type: "int"})
    frontDeskUserAccountId: number;

    @Column({name: "ReadingUserAccountId", nullable: false, type: "int"})
    readingUserAccountId: number;

    @Column({name: "PassManagerUserAccountId", nullable: false, type: "int"})
    passManagerUserAccountId: number;

    @Column({name: "SoundAndImageUserAccountId", nullable: false, type: "int"})
    soundAndImageUserAccountId: number;

    @Column({name: "ThemeGospel", type: "text", nullable: false})
    themeGospel: string;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.leaderMeetings)
    @JoinColumn({
        name: "LeaderUserAccountId",
        referencedColumnName: "userAccountId"
    })
    leaderUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.gospelMeetings)
    @JoinColumn({
        name: "GospelUserAccountId",
        referencedColumnName: "userAccountId"
    })
    gospelUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.vibrationMeetings)
    @JoinColumn({
        name: "VibrationUserAccoundId",
        referencedColumnName: "userAccountId"
    })
    vibrationUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.frontDeskMeetings)
    @JoinColumn({
        name: "FrontDeskUserAccountId",
        referencedColumnName: "userAccountId"
    })
    frontDeskUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.readingMeetings)
    @JoinColumn({
        name: "ReadingUserAccountId",
        referencedColumnName: "userAccountId"
    })
    readingUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.passManagerMeetings)
    @JoinColumn({
        name: "PassManagerUserAccountId",
        referencedColumnName: "userAccountId"
    })
    passManagerUserAccount: UserAccount;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.soundAndImageMeetings)
    @JoinColumn({
        name: "SoundAndImageUserAccountId",
        referencedColumnName: "userAccountId"
    })
    soundAndImageUserAccount: UserAccount;
}