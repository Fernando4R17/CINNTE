import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empresa } from '../empresa/Empresa';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  idProducto!: number;

  @Column({ name: 'codigo', type: 'varchar', length: 100 })
  codigo!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ name: 'alias', type: 'varchar', length: 255 })
  alias!: string;

  @Column({ name: 'id_empresa' })
  idEmpresa!: number;

  @ManyToOne(() => Empresa, (empresa: Empresa) => empresa.productos)
  @JoinColumn({ name: 'id_empresa' })
  empresa!: Empresa;
} 