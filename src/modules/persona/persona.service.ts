import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @Inject('PERSONA_REPOSITORY')
    private readonly personaRepository: Repository<Persona>
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    try {
      const persona = this.personaRepository.create({
        nombres: createPersonaDto.nombres.trim(),
        apellidos: createPersonaDto.apellidos.trim(),
        mail: createPersonaDto.mail?.trim() || null,
        user: createPersonaDto.userId ? ({ id: createPersonaDto.userId } as any) : undefined
      });

      return await this.personaRepository.save(persona);
    } catch (error) {
      console.error('Error al registrar persona:', error);
      throw error;
    }
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find({
      relations: {
        user: true
      },
      order: {
        id: 'asc'
      }
    });
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    });

    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.findOne(id);

    if (updatePersonaDto.nombres !== undefined) {
      persona.nombres = updatePersonaDto.nombres.trim();
    }
    if (updatePersonaDto.apellidos !== undefined) {
      persona.apellidos = updatePersonaDto.apellidos.trim();
    }
    if (updatePersonaDto.mail !== undefined) {
      persona.mail = updatePersonaDto.mail.trim() || null;
    }
    if (updatePersonaDto.userId !== undefined) {
      persona.user = updatePersonaDto.userId ? ({ id: updatePersonaDto.userId } as any) : undefined;
    }

    return await this.personaRepository.save(persona);
  }

  async remove(id: number): Promise<{ message: string }> {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
    return { message: `Persona con ID ${id} eliminada correctamente` };
  }
}
