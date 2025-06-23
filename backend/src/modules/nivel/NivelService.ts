import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Nivel } from './Nivel';

export class NivelService {
  private nivelRepository: Repository<Nivel>;

  constructor() {
    this.nivelRepository = AppDataSource.getRepository(Nivel);
  }

  async findAll(): Promise<Nivel[]> {
    return await this.nivelRepository.find();
  }

  async findById(id: number): Promise<Nivel | null> {
    return await this.nivelRepository.findOne({ where: { idNivel: id } });
  }
} 