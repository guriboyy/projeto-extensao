import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity({name: "RefreshToken"})
export class RefreshToken {

    @PrimaryGeneratedColumn({name: "RefreshTokenId"})
    refreshTokenId: number;

    @Column({name: "Token", nullable: false, type: "varchar", length: 255})
    token: string;

    @Column({name: "UserAccountId", nullable: false, type: "int"})
    userAccountId: number;

    @CreateDateColumn({name: "CreatedAt", nullable: false})
    createdAt: Date;

    @Column({name: "ExpirationDate", nullable: true, type: "timestamp"})
    expirationDate?: Date;

    @Column({name: "IsRevoked", nullable: false, type: "boolean", default: false})
    isRevoked: boolean;

    @ManyToOne(() => UserAccount, (user) => user.refreshTokens)
    @JoinColumn({
        name: "UserAccountId",
        referencedColumnName: "userAccountId"
    })
    userAccount: UserAccount;
}
