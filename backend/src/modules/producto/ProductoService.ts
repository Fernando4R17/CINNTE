import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Producto } from './Producto';
import { CreateProductoDto } from './ProductoDto';

export class ProductoService {
  private productoRepository: Repository<Producto>;

  constructor() {
    this.productoRepository = AppDataSource.getRepository(Producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['empresa']
    });
  }

  async findById(id: number): Promise<Producto | null> {
    return await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['empresa']
    });
  }

  async findAllWithRelations(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['empresa', 'empresa.nivel']
    });
  }

  async findByIdWithRelations(id: number): Promise<Producto | null> {
    return await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['empresa', 'empresa.nivel']
    });
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(producto);
  }
} 