import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required for the route, allow access.
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Access the user attached by LocalStrategy

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}