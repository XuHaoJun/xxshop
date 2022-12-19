import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import {
	AddShopDto,
	DeleteShopsDto,
	IdParamsDto,
	PutShopDto
} from './dto/shop.dto';
import type { ShopEntity } from './repository/shop.entity';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsSvc: ShopsService) {}

  @Get('/')
  async getShops(): Promise<Array<ShopEntity>> {
    return this.shopsSvc.findMany();
  }

  @Get('/:id')
  async getShop(@Param() params: IdParamsDto): Promise<ShopEntity> {
    return this.shopsSvc.findOneById(params.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/')
  async addShop(@Body() addShopDto: AddShopDto): Promise<void> {
    console.log(addShopDto);
    await this.shopsSvc.add(addShopDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('/:id')
  async putShop(
    @Param() params: IdParamsDto,
    @Body() putShopDto: PutShopDto,
  ): Promise<void> {
    await this.shopsSvc.put(params.id, putShopDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/')
  async deleteShops(@Body() deleteShopDto: DeleteShopsDto): Promise<void> {
    await this.shopsSvc.deleteShopsByIds(deleteShopDto.ids);
  }
}
