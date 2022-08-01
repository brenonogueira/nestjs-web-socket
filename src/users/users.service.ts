import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private gateway: AppGateway) {}

  async create(createUserDto: CreateUserDto) {
    const userCreate = await this.prisma.user.create({
      data: createUserDto,
    });

    userCreate;

    this.gateway.wss.emit('newUser', userCreate);
    return true;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
