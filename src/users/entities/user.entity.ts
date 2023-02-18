import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  login: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 1 })
  version: number; // integer number, increments on update

  @Column({ default: Math.floor(Date.now() / 1000) })
  createdAt: number; // timestamp of creation

  @Column({ default: Math.floor(Date.now() / 1000) })
  updatedAt: number; // timestamp of last update
}
