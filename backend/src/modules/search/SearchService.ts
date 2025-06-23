import { AppDataSource } from '../../config/database';
import { Producto } from '../producto/Producto';
import { Empresa } from '../empresa/Empresa';
import { ILike } from 'typeorm';

export class SearchService {
  async search(query: string) {
    const productoRepo = AppDataSource.getRepository(Producto);
    const empresaRepo = AppDataSource.getRepository(Empresa);

    // Busca productos
    const productos = await productoRepo.find({
      where: [
        { codigo: ILike(`%${query}%`) },
        { nombre: ILike(`%${query}%`) },
        { alias: ILike(`%${query}%`) }
      ],
      relations: ['empresa', 'empresa.nivel']
    });

    // Busca compañias
    const empresas = await empresaRepo.find({
      where: [
        { nombre: ILike(`%${query}%`) },
        { domicilio: ILike(`%${query}%`) },
        { telefono: ILike(`%${query}%`) },
        { correo: ILike(`%${query}%`) }
      ],
      relations: ['nivel', 'productos']
    });

    return { productos, empresas };
  }
} 