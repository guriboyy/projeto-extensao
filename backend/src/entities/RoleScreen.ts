import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Screen } from "./Screen";

@Entity({name: "RoleScreen"})
export class RoleScreen {

    @PrimaryGeneratedColumn({name: "RoleScreenId"})
    roleScreenId: number;

    @Column({name: "ScreenId", type: "int", nullable: false})
    screenId: number;

    @Column({name: "RoleId", type: "int", nullable: false})
    roleId: number;

    @ManyToOne(() => Screen, (screen) => screen.roleScreens)
    @JoinColumn({
        name: "ScreenId",
        referencedColumnName: "screenId"
    })
    screen: Screen;

    @ManyToOne(() => Role, (role) => role.roleScreens)
    @JoinColumn({
        name: "RoleId",
        referencedColumnName: "roleId"
    })
    role: Role;
}
