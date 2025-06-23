import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empresa } from '../empresa/Empresa';
import { Banco } from '../banco/Banco';

@Entity('niveles')
export class Nivel {
  @PrimaryGeneratedColumn({ name: 'id_nivel' })
  idNivel!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre!: string;

  @OneToMany(() => Empresa, (empresa: Empresa) => empresa.nivel)
  empresas!: Empresa[];

  @OneToMany(() => Banco, (banco: Banco) => banco.nivel)
  bancos!: Banco[];
} 