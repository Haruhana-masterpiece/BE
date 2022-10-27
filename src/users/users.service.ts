import { Model } from 'mongoose';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Users, UsersDocument } from './schemas/users.schema';
import { UsersDto } from './dto/users.dto';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private jwtService: JwtService) {}

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
  async login(usersDto: UsersDto): Promise<{ accessToken: string } | undefined> {
    try {
      const findUser: UsersDto = await this.usersModel.findOne({ email: usersDto.email });
      const passwordCheck = await bcrypt.compare(usersDto.password, findUser.password);

      if (!findUser || !passwordCheck) {
        throw new UnauthorizedException();
      }

      const payload: Payload = {
        email: findUser.email,
        role: findUser.role,
      };

      return { accessToken: this.jwtService.sign(payload) };
    } catch (error) {
      console.error(error);
    }
  }

  // 로그인 토큰 검증
  async tokenValidateUser(payload: Payload): Promise<UsersDto | undefined> {
    return await this.usersModel.findOne({ email: payload.email });
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
      return await this.usersModel.count();
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 상세 정보
  async findOne(id: string): Promise<Users> {
    try {
      return await this.usersModel.findById(id);
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 정보 수정
  async update(id: string, usersDto: UsersDto) {
    try {
      return await this.usersModel.updateOne({ _id: id }, { $set: usersDto });
    } catch (error) {
      console.error(error);
    }
  }

  // 회원 탈퇴
  async remove(id: string) {
    try {
      return await this.usersModel.deleteOne({ _id: id });
    } catch (error) {
      console.error(error);
    }
  }
}
