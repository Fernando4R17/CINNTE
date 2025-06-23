import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Empresa } from './Empresa';
import { CreateEmpresaDto } from './EmpresaDto';

export class EmpresaService {
  private empresaRepository: Repository<Empresa>;

  constructor() {
    this.empresaRepository = AppDataSource.getRepository(Empresa);
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      relations: ['nivel']
    });
  }

  async findById(id: number): Promise<Empresa | null> {
    return await this.empresaRepository.findOne({
      where: { idEmpresa: id },
      relations: ['nivel']
    });
  }

  async findByNivel(idNivel: number): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      where: { idNivel },
      relations: ['nivel']
    });
  }

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    // Revisa si empresa existe en otro nivel
    const existingEmpresa = await this.empresaRepository.findOne({
      where: { nombre: createEmpresaDto.nombre }
    });

    if (existingEmpresa) {
      throw new Error(`'${createEmpresaDto.nombre}' ya existe en el nivel ${existingEmpresa.idNivel}. La empresas no pueden ser duplicadas en diferentes niveles`);
    }

    const empresa = this.empresaRepository.create(createEmpresaDto);
    return await this.empresaRepository.save(empresa);
  }
} 