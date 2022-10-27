import { Controller, Get, Post, Body, Res, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './security/auth.guard';
import { RoleGuard } from './security/role.guard';
import { Role } from './decorator/role.decorator';
import { RoleType } from './role-type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() usersDto: UsersDto) {
    return await this.usersService.register(usersDto);
  }

  @Post('/login')
  async login(@Body() usersDto: UsersDto, @Res() res: Response) {
    const jwt = await this.usersService.login(usersDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1일
    });
    return res.send({
      message: 'success',
    });
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(AuthGuard, RoleGuard)
  @Role(RoleType.ADMIN)
  adminRoleCheck(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  @Post('/logout')
  logout(@Res() res: Response): any {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
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
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usersDto: UsersDto) {
    return this.usersService.update(id, usersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
