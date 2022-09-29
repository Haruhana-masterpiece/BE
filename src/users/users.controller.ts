import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() usersDto: UsersDto) {
    return this.usersService.register(usersDto);
  }

  @Post('/login')
  login(@Body() usersDto: UsersDto) {
    return this.usersService.login(usersDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/count')
  countUsers() {
    return this.usersService.countUsers();
  }

  @Get('/detail')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usersUpdateDto) {
    return this.usersService.update(+id, usersUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
