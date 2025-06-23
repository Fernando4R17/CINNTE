import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Nivel } from '../nivel/Nivel';
import { Producto } from '../producto/Producto';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'id_empresa' })
  idEmpresa!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ name: 'domicilio', type: 'varchar', length: 500 })
  domicilio!: string;

  @Column({ name: 'telefono', type: 'varchar', length: 20 })
  telefono!: string;

  @Column({ name: 'correo', type: 'varchar', length: 255 })
  correo!: string;

  @Column({ name: 'id_nivel' })
  idNivel!: number;

  @ManyToOne(() => Nivel, nivel => nivel.empresas)
  @JoinColumn({ name: 'id_nivel' })
  nivel!: Nivel;

  @OneToMany(() => Producto, producto => producto.empresa)
  productos!: Producto[];
} 