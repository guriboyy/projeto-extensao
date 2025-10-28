import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "EventBoard"})
export class EventBoard {

    @PrimaryGeneratedColumn({name: "EventBoardId"})
    eventBoardId: number;

    @Column({name: "Title", nullable: false, type: "varchar", length: 150})
    title: string;

    @Column({name: "Description", nullable: true, type: "text"})
    description?: string;

    @Column({name: "EventDate", nullable: false, type: "timestamp"})
    eventDate: Date;
}