import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @Inject('DEPARTAMENTO_REPOSITORY')
    private readonly departamentoRepository: Repository<Departamento>
  ) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    return 'This action adds a new departamento';
  }

  findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
