import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddShopOwnerDto } from './dto/shop.dto';
import { ShopOwnerEntity } from './repository/shopOwner.entity';
import { ShopsService } from './shops.service';

@Controller('shop-owners')
export class ShopOwnersController {
  constructor(private readonly shopsSvc: ShopsService) {}

  @Get('/')
  async getShops(): Promise<Array<ShopOwnerEntity>> {
    return this.shopsSvc.shopOwnersFindMany();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/')
  async addShopOwner(
    @Body() addShopOwnerDto: AddShopOwnerDto,
  ): Promise<ShopOwnerEntity> {
    return this.shopsSvc.addShopOwner(addShopOwnerDto);
  }
}
