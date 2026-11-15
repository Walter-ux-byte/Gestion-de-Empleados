import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentoService } from './departamento.service';

describe('DepartamentoService', () => {
  let service: DepartamentoService;
  const departamentoRepository = {
    find: jest.fn()
  };

  beforeEach(async () => {
    departamentoRepository.find.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartamentoService,
        {
          provide: 'DEPARTAMENTO_REPOSITORY',
          useValue: departamentoRepository,
        },
      ],
    }).compile();

    service = module.get<DepartamentoService>(DepartamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns all departments', async () => {
    const departments = [
      { id: 1, nombreDepartamento: 'Sistemas', ubicacion: 'Piso 2' },
    ];
    departamentoRepository.find.mockResolvedValue(departments);

    await expect(service.findAll()).resolves.toEqual(departments);
  });
});
