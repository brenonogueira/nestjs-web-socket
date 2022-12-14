import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,

  // Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Req() req: any,
  ) {
    const createUser = this.usersService.create(createUserDto);
    createUser;
    if (createUser) {
      res.redirect('users');
    }
  }

  @Get('form_user')
  async formUsers(@Res() res: Response) {
    return res.render('pages/users/create');
  }

  @Get()
  async findAll(@Res() res: any, @Req() req: any) {
    const users = await this.usersService.findAll();

    return res.render('pages/users/users', {
      // layout: 'mainLayout',
      usuarios: users,
      message: 'hELLO WORLD',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteUser = this.usersService.remove(+id);
    deleteUser;

    if (deleteUser) {
      res.redirect('/users');
    } else {
      throw new Error('falha');
    }
  }
}
