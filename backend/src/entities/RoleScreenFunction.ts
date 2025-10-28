import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScreenFunction } from "./ScreenFunction";
import { Role } from "./Role";

@Entity({name: "RoleScreenFunction"})
export class RoleScreenFunction {

    @PrimaryGeneratedColumn({name: "RoleScreenFunctionId"})
    roleScreenFunctionId: number;

    @Column({name: "ScreenFunctionId", type: "int", nullable: false})
    screenFunctionId: number;

    @Column({name: "RoleId", type: "int", nullable: false})
    roleId: number;

    
    @ManyToOne(() => ScreenFunction, (screenFunction) => screenFunction.roleScreenFunctions)
    @JoinColumn({
        name: "ScreenFunctionId",
        referencedColumnName: "screenFunctionId"
    })
    screenFunction: ScreenFunction;

        
    @ManyToOne(() => Role, (role) => role.roleScreenFunctions)
    @JoinColumn({
        name: "RoleId",
        referencedColumnName: "roleId"
    })
    role: Role;
}
