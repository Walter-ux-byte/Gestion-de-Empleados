import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  @Column({ type: 'varchar', nullable: true })
  mail?: string | null;

  // Relación 1 a 1 con el Usuario (opcional)
  @OneToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;
}
