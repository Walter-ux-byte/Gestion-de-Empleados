import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Departamento } from '../../departamento/entities/departamento.entity';

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombreCargo!: string; // Ej: 'Desarrollador', 'Contador'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salarioBase!: number;

  
  @ManyToOne(() => Departamento, (departamento) => departamento.cargos)
  departamento!: Departamento;
}