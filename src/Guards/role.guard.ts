import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    // Adjusted to check for a 'roles' property instead of 'role'
    if (!user || !user.role || user.role.length === 0) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Assuming 'roles' is an array of strings or Role objects
    // Adjust the logic here based on the actual structure of roles
    return requiredRoles.some((role) => user.role.includes(role));
  }
}