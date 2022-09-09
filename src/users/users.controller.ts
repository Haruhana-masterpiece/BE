import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRegisterDto } from './dto/users-register.dto';
import { UsersUpdateDto } from './dto/users-update.dto';
import { UsersLoginDto } from './dto/users-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() usersRegisterDto: UsersRegisterDto) {
    return this.usersService.register(usersRegisterDto);
  }

  @Post('/login')
  login(@Body() usersLoginDto: UsersLoginDto) {
    return this.usersService.login(usersLoginDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usersUpdateDto: UsersUpdateDto) {
    return this.usersService.update(+id, usersUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
