import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSvc: UsersService) {}

  @Get('/:id')
  async getUser(@Request() req): Promise<string> {
    return '';
  }
}
