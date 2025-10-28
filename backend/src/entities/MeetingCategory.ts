import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Meeting } from "./Meeting";

@Entity({name: "MeetingCategory"})
export class MeetingCategory {

    @PrimaryGeneratedColumn({name: "MeetingCategoryId"})
    meetingCategoryId: number;

    @Column({name: "Name", nullable: false, type: "varchar", length: 130})
    name: string;

    @OneToMany(() => Meeting, (meeting) => meeting.meetingCategory)
    meetings?: Meeting[];
}