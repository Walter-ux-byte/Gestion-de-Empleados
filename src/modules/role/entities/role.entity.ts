import { Entity, PrimaryGeneratedColumn, Column,JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string; 

  @Column({ nullable: true })
  detalle!: string;

  // Relación Muchos a Muchos con los Usuarios
  @ManyToMany(() => User)
  @JoinTable({name:"role_user"}) 
  users!: User[];
}