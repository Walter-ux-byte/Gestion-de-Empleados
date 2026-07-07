import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cargo } from '../../cargo/entities/cargo.entity';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombreDepartamento!: string; // Ej: 'Sistemas', 'Recursos Humanos'

  @Column({ nullable: true })
  ubicacion!: string; // Ej: 'Piso 2', 'Bloque A'

  // Un departamento tiene muchos Cargos
  @OneToMany(() => Cargo, (cargo) => cargo.departamento)
  cargos!: Cargo[];
}