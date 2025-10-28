import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleScreen } from "./RoleScreen";
import { ScreenFunction } from "./ScreenFunction";

@Entity({name: "Screen"})
export class Screen {

    @PrimaryGeneratedColumn({name: "ScreenId"})
    screenId: number;

    @Column({name: "Name", type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({name: "Icon", type: "varchar", length: 100, nullable: true})
    icon?: string;

    @Column({name: "Path", type: "varchar", length: 100, nullable: true})
    path?: string;

    @OneToMany(() => RoleScreen, (roleScreen) => roleScreen.screen)
    roleScreens?: RoleScreen[];

    @OneToMany(() => ScreenFunction, (screenFunction) => screenFunction.screen)
    screenFunctions?: ScreenFunction[];
}
