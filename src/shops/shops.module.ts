import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './repository/shop.entity';
import { ShopOwnerEntity } from './repository/shopOwner.entity';
import { ShopOwnersController } from './shopOwners.controller';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity, ShopOwnerEntity])],
  controllers: [ShopsController, ShopOwnersController],
  providers: [ShopsService],
})
export class ShopsModule {}
