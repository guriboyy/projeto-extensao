import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Screen } from "./Screen";
import { RoleScreenFunction } from "./RoleScreenFunction";

@Entity({name: "ScreenFunction"})
export class ScreenFunction {

    @PrimaryGeneratedColumn({name: "ScreenFunctionId"})
    screenFunctionId: number;

    @Column({name: "ScreenId", type: "int", nullable: false})
    screenId: number;

    @Column({name: "Name", type: "varchar", nullable: false, length: 100})
    name: string;

    @Column({name: "Description", type: "varchar", nullable: true, length: 200})
    description?: string;

    @ManyToOne(() => Screen, (screen) => screen.screenFunctions)
    @JoinColumn({
        name: "ScreenId",
        referencedColumnName: "screenId"
    })
    screen: Screen;

    @OneToMany(() => RoleScreenFunction, (roleScreenFunction) => roleScreenFunction.screenFunction)
    roleScreenFunctions?: ScreenFunction[];
}
