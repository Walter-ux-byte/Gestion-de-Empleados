import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Asegúrate de que esta ruta llegue a tu user.entity

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  // Relación 1 a 1 con el Usuario
  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}