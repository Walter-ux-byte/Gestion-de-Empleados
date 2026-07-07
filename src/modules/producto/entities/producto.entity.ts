import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity'; // Verifica que esta ruta apunte bien a tu entidad de categoría

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio!: number;

  @Column()
  stock!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ default: true })
  estado!: boolean;
  @ManyToOne(() => Categoria, (cat) => cat.productos)
  categoria!: Categoria;
}