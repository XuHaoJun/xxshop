import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddShopDto, AddShopOwnerDto, PutShopDto } from './dto/shop.dto';
import { ShopEntity } from './repository/shop.entity';
import { ShopOwnerEntity } from './repository/shopOwner.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private shopsRepo: Repository<ShopEntity>,
    @InjectRepository(ShopOwnerEntity)
    private shopOwnersRepo: Repository<ShopOwnerEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async shopOwnersFindMany(): Promise<Array<ShopOwnerEntity>> {
    return this.shopOwnersRepo.find();
  }

  async addShopOwner(
    addShopOwnerDto: AddShopOwnerDto,
  ): Promise<ShopOwnerEntity> {
    return this.shopOwnersRepo.save(addShopOwnerDto);
  }

  async findMany(): Promise<Array<ShopEntity>> {
    return this.shopsRepo.find({ relations: ['owner'] });
  }

  async findOneById(id: number): Promise<ShopEntity> {
    return this.shopsRepo.findOne({ where: { id }, relations: ['owner'] });
  }

  async add(addShopDto: AddShopDto): Promise<void> {
    await this.shopsRepo.insert(addShopDto);
  }

  async put(id: number, putShopDto: PutShopDto): Promise<void> {
    await this.shopsRepo.update(id, putShopDto);
  }

  async deleteShopsByIds(ids: number[]): Promise<void> {
    await this.shopsRepo.delete(ids);
  }
}
