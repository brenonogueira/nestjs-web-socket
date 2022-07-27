import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AppGateway],
})
export class UsersModule {}
