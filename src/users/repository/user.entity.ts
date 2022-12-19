import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  displayName: string;

  @Column({ default: '' })
  avatarUrl: string;

  @Column({ unique: true, nullable: true })
  lineId: string;
}
