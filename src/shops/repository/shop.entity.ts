import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { ShopOwnerEntity } from './shopOwner.entity';

@Entity({ name: 'shop' })
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  displayName: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  phoneNumber: string;

  @ManyToOne(() => ShopOwnerEntity)
  @JoinColumn()
  owner: ShopOwnerEntity;
}
