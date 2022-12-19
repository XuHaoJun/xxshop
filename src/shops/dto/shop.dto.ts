import { Transform, Type } from 'class-transformer';
import {
	ArrayMaxSize,
	ArrayUnique,
	IsArray,
	IsDefined,
	IsInt,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator';
import * as _ from 'lodash';

export class IdParamsDto {
  @Transform(({ value }) => _.toNumber(value))
  @IsInt()
  @Min(1)
  @IsDefined()
  id: number;
}

export class AddShopOwnerDto {
  @MinLength(1)
  @MaxLength(100)
  @IsString()
  @IsDefined()
  displayName: string;

  @Transform(({ value }) => (_.isNil(value) ? '' : value))
  @MaxLength(300)
  @IsString()
  @IsDefined()
  description: string;
}

export class ShopOwnerIdDto {
  @Transform(({ value }) => (value === undefined || value <= 0 ? null : value))
  @IsInt()
  @IsOptional()
  id?: number;
}

export class AddShopDto {
  @MinLength(1)
  @MaxLength(100)
  @IsString()
  @IsDefined()
  displayName: string;

  @MinLength(1)
  @MaxLength(300)
  @IsString()
  @IsDefined()
  address: string;

  @MaxLength(300)
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ValidateNested()
  @Type(() => ShopOwnerIdDto)
  @IsDefined()
  owner: ShopOwnerIdDto;
}

export class PutShopDto extends AddShopDto {}

export class DeleteShopsDto {
  @IsInt({ each: true })
  @ArrayMaxSize(10000)
  @IsArray()
  @ArrayUnique()
  @IsDefined()
  ids: number[];
}
