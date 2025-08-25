import { BaseEntity } from "src/data/base/models/model.entitiy";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

@Entity('tickets')
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ticket_id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  contact?: string;

  @Column({
      type: 'enum',
      enum: TicketStatus,
      default: TicketStatus.PENDING,
    })
  status: string;
}

