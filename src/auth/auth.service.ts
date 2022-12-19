import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/repository/user.entity';
import { UsersService } from 'src/users/users.service';
import type { LineProfile } from '../interfaces/line.interface';

@Injectable()
export class AuthService {
  constructor(private usersSvc: UsersService) {}

  async validateLine(lineProfile: LineProfile): Promise<UserEntity> {
    return this.usersSvc.createOrFindUserByLine(lineProfile);
  }
}
