
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('CATEGORIA_REPOSITORY')
    private categoriaRepository: Repository<Categoria>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = new Categoria();
      categoria.nombre = createCategoriaDto.nombre;
      categoria.detalle = createCategoriaDto.detalle ?? '';

      return await this.categoriaRepository.save(categoria);
    } catch (err: any) {
      console.error('Error al guardar categoría en BD:', err);
      throw err;
    }
  }

  async findAll() {
    return await this.categoriaRepository.find({
      order: {
        id: 'asc'
      }
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return await this.categoriaRepository.remove(categoria);
  }
}
