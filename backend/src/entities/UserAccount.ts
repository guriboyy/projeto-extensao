import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { NoticeBoard } from "./NoticeBoard";
import { RefreshToken } from "./RefreshToken";
import { Meeting } from "./Meeting";
import { Vibration } from "./Vibration";
import { PasswordResetCode } from "./PasswordResetCode";

@Entity({name: "UserAccount"})
export class UserAccount {
    @PrimaryGeneratedColumn({name: "UserAccountId"})
    userAccountId: number;

    @Column({name: "FirstName", nullable: false, type: "varchar", length: 150})
    firstName: string;

    @Column({name: "LastName", nullable: false, type: "varchar", length: 150})
    lastName: string;

    @Column({name: "Email", nullable: false, type: "varchar", length: 150, unique: true})
    email: string;

    @Column({name: "Password", nullable: false, type: "varchar", length: 255})
    password: string;

    @Column({name: "PhoneNumber", nullable: true, type: "varchar", length: 30})
    phoneNumber?: string;

    @Column({name: "IsActive", nullable: false, type: "boolean", default: true})
    isActive: boolean;

    @Column({name: "RoleId", type: "int"})
    roleId: number;

    @CreateDateColumn({name: "CreatedAt", nullable: false, type: "datetime"})
    createdAt: Date;

    @Column({name: "UpdatedAt", nullable: true, type: "datetime"})
    updatedAt?: Date;

    @ManyToOne(() => Role, (role) => role.userAccounts)
    @JoinColumn({
        name: "RoleId",
        referencedColumnName: "roleId"
    })
    role: Role;

    @OneToMany(() => NoticeBoard, (noticeBoard) => noticeBoard.userAccount)
    noticeBoards?: NoticeBoard[];

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.userAccount)
    refreshTokens?: RefreshToken[];

    @OneToMany(() => Meeting, (meeting) => meeting.userAccount)
    meetings?: Meeting[];

    @OneToMany(() => Vibration, (vibration) => vibration.userAccount)
    vibrations?: Vibration[];

    @OneToMany(() => PasswordResetCode, (passwordResetCode) => passwordResetCode.userAccount)
    passwordResetCodes?: PasswordResetCode[];
}
