import { Injectable } from '@nestjs/common';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';
import { UsersUpdateDto } from './dto/users-update.dto';

@Injectable()
export class UsersService {
  async register(usersRegisterDto: UsersRegisterDto) {
    const { email, name, password, phone } = usersRegisterDto;
    await this.checkUserExists(email);
    await this.saveUser(email, name, password, phone);
  }

  async login(usersLoginDto: UsersLoginDto) {
    const { email, password } = usersLoginDto;
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, usersUpdateDto: UsersUpdateDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private saveUser(email: string, name: string, password: string, phone: string) {
    return; // TODO: DB 연동 후 구현
  }
}
