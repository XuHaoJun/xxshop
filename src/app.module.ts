import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShopEntity } from './shops/repository/shop.entity';
import { ShopOwnerEntity } from './shops/repository/shopOwner.entity';
import { ShopsModule } from './shops/shops.module';
import { UserEntity } from './users/repository/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configSvc: ConfigService) => {
        return {
          type: 'postgres',
          url: configSvc.get('DATABASE_URL'),
          entities: [UserEntity, ShopEntity, ShopOwnerEntity],
          synchronize: true,
          logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ShopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
