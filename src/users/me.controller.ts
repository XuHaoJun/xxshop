import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import type { UserEntity } from './repository/user.entity';
import { UsersService } from './users.service';

@Controller('me')
export class MeController {
  constructor(private readonly usersSvc: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  async getMe(@Request() req): Promise<Partial<UserEntity>> {
    const user = await this.usersSvc.findById(req.user.id);
    return _.omit(user, ['password']);
  }
}
