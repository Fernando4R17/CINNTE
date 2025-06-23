import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Nivel } from '../nivel/Nivel';

@Entity('bancos')
export class Banco {
  @PrimaryGeneratedColumn({ name: 'id_banco' })
  idBanco!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ name: 'id_nivel' })
  idNivel!: number;

  @ManyToOne(() => Nivel, (nivel: Nivel) => nivel.bancos)
  @JoinColumn({ name: 'id_nivel' })
  nivel!: Nivel;
} 