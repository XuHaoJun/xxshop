import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import type { LineProfile } from '../interfaces/line.interface';
import { UserEntity } from './repository/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async createOrFindUserByLine(lineProfile: LineProfile): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    let user: UserEntity;
    try {
      const usersRepo = queryRunner.manager.getRepository(UserEntity);

      user = await usersRepo.findOne({
        where: { lineId: lineProfile.id },
      });
      if (!user) {
        const lineIdSecretHash = crypto
          .createHmac('sha1', 'YOUR_SECRECT_HERE')
          .update(lineProfile.id)
          .digest('hex');
        const passwordHash = await bcrypt.hash(lineIdSecretHash, 10);

        const email = UsersService.randomEmail();

        await usersRepo.insert({
          email,
          password: passwordHash,
          displayName: lineProfile.displayName,
          avatarUrl: lineProfile.avatarUrl,
          lineId: lineProfile.id,
        });

        user = await usersRepo.findOne({
          where: { lineId: lineProfile.id },
        });
      }

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  static randomEmail(): string {
    return `${uuidv4().replace(/-/g, '')}@random.tmp`;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.usersRepo.findOne({ where: { id } });
  }
}
