import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shop_owner' })
export class ShopOwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  displayName: string;

  @Column({ default: '' })
  description: string;
}
