import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketsRepository } from './tickets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket])
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    TicketsRepository
  ],
})
export class TicketsModule {}
