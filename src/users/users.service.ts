import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Users, UsersDocument } from './schemas/users.schema';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  // 회원가입
  async register(usersDto: UsersDto): Promise<Users> {
    try {
      const isExists = await this.usersModel.exists({ email: usersDto.email });
      if (isExists) {
        throw new UnprocessableEntityException('해당 이메일은 이미 가입되어 있습니다.');
      }
      usersDto.password = await bcrypt.hash(usersDto.password, 10);

      return await this.usersModel.create(usersDto);
    } catch (error) {
      console.error(error);
    }
  }

  // 로그인
  async login(usersDto: UsersDto): Promise<void> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급
  }

  // 사용자 목록 조회
  async findAll(): Promise<Users[]> {
    try {
      return await this.usersModel.find();
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 수
  async countUsers(): Promise<number> {
    try {
      return 0;
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 상세 정보
  async findOne(id: number) {
    try {
      return await this.usersModel.findById(id);
    } catch (error) {
      console.error(error);
    }
  }

  update(id: number, usersUpdateDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async;
}
