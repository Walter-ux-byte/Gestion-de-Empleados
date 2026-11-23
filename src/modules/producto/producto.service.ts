import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  queryBuilder(alias: string) {
    return this.productoRepository.createQueryBuilder(alias);
  }

  async create(createProductoDto: CreateProductoDto) {
    const { categoriaId, imagen, ...datosProducto } = createProductoDto;

    const producto = this.productoRepository.create({
      ...datosProducto,
      image: imagen,
      categoria: { id: categoriaId },
    });

    return await this.productoRepository.save(producto);
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!producto) {
      throw new NotFoundException(`El producto con ID #${id} no existe`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    const { categoriaId, imagen, ...datosProducto } = updateProductoDto;

    const productoActualizado = this.productoRepository.merge(producto, {
      ...datosProducto,
      ...(imagen !== undefined && { image: imagen }),
      ...(categoriaId && { categoria: { id: categoriaId } }),
    });

    return await this.productoRepository.save(productoActualizado);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return await this.productoRepository.remove(producto);
  }
}