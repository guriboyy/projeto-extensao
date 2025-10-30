import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import { UserAccount } from "./UserAccount";

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
export type EventVisibility = 'PUBLIC' | 'MEMBERS' | 'ROLE';

@Entity({ name: "EventBoard" })
export class EventBoard {
  @PrimaryGeneratedColumn({ name: "EventBoardId" })
  eventBoardId: number;

  @Column({ name: "Title", type: "varchar", length: 150, nullable: false })
  title: string;

  @Column({ name: "Description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "EventDate", type: "datetime", nullable: true })
  eventDate?: Date;

  @Column({ name: "StartAt", type: "datetime", nullable: false })
  startAt: Date;

  @Column({ name: "EndAt", type: "datetime", nullable: false })
  endAt: Date;

  @Column({ name: "Location", type: "varchar", length: 150, nullable: true })
  location?: string;

  @Column({ name: "Status", type: "varchar", length: 10, default: "DRAFT" })
  status: EventStatus;

  @Column({ name: "Visibility", type: "varchar", length: 10, default: "PUBLIC" })
  visibility: EventVisibility;

  @Column({ name: "Category", type: "varchar", length: 100, nullable: true })
  category?: string;

  @Column({ name: "CreatedByUserAccountId", type: "int" })
  createdByUserAccountId: number;

  @ManyToOne(() => UserAccount)
  @JoinColumn({ name: "CreatedByUserAccountId", referencedColumnName: "userAccountId" })
  createdBy?: UserAccount;

  @Column({ name: "UpdatedByUserAccountId", type: "int", nullable: true })
  updatedByUserAccountId?: number;

  @ManyToOne(() => UserAccount, { nullable: true })
  @JoinColumn({ name: "UpdatedByUserAccountId", referencedColumnName: "userAccountId" })
  updatedBy?: UserAccount;

  @CreateDateColumn({ name: "CreatedAt", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "UpdatedAt", type: "datetime", nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "DeletedAt", type: "datetime", nullable: true })
  deletedAt?: Date | null;
}