import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersDto } from '../dto/users.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UsersDto;

    return user && user.role && user.role == role;
  }
}
