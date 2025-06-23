import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Banco } from './Banco';
import { CreateBancoDto } from './BancoDto';

export class BancoService {
  private bancoRepository: Repository<Banco>;

  constructor() {
    this.bancoRepository = AppDataSource.getRepository(Banco);
  }

  async findAll(): Promise<Banco[]> {
    return await this.bancoRepository.find({
      relations: ['nivel']
    });
  }

  async findById(id: number): Promise<Banco | null> {
    return await this.bancoRepository.findOne({
      where: { idBanco: id },
      relations: ['nivel']
    });
  }

  async findByNivel(idNivel: number): Promise<Banco[]> {
    return await this.bancoRepository.find({
      where: { idNivel },
      relations: ['nivel']
    });
  }

  async create(createBancoDto: CreateBancoDto): Promise<Banco> {
    // Revisa si un banco existe en otro nivel
    const existingBanco = await this.bancoRepository.findOne({
      where: { nombre: createBancoDto.nombre }
    });

    if (existingBanco) {
      throw new Error(`'${createBancoDto.nombre}' ya existe en nivel ${existingBanco.idNivel}. Los bancos no pueden ser duplicados en otros niveles.`);
    }

    const banco = this.bancoRepository.create(createBancoDto);
    return await this.bancoRepository.save(banco);
  }
} 