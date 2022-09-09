import { PartialType } from '@nestjs/mapped-types';
import { UsersRegisterDto } from './users-register.dto';

export class UsersUpdateDto extends PartialType(UsersRegisterDto) {}
