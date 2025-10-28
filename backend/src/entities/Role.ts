import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";
import { RoleScreen } from "./RoleScreen";
import { RoleScreenFunction } from "./RoleScreenFunction";

@Entity({name: "Role"})
export class Role {

    @PrimaryGeneratedColumn({name: "RoleId"})
    roleId: number;

    @Column({name: "Name", nullable: false, type: "varchar", length: 20})
    name: string;

    @OneToMany(() => UserAccount, (userAccount) => userAccount.role)
    userAccounts?: UserAccount[];

    @OneToMany(() => RoleScreen, (roleScreen) => roleScreen.role)
    roleScreens?: RoleScreen[];

    @OneToMany(() => RoleScreenFunction, (roleScreenFunction) => roleScreenFunction.role)
    roleScreenFunctions?: RoleScreenFunction[];
}
