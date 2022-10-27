import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../role-type';

export const Role = (...role: RoleType[]): any => SetMetadata('role', role);
