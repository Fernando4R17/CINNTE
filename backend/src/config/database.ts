import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Nivel } from '../modules/nivel/Nivel';
import { Empresa } from '../modules/empresa/Empresa';
import { Banco } from '../modules/banco/Banco';
import { Producto } from '../modules/producto/Producto';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'postgres',
  schema: process.env.DB_SCHEMA || 'public',
  synchronize: false,
  logging: false,
  entities: [Nivel, Empresa, Banco, Producto],
  migrations: [],
  subscribers: [],
  
  // Configuración Pool
  extra: {
    // Numero maximo de conexiones de pool
    max: parseInt(process.env.DB_POOL_MAX || '20'),
    // Numero minimo de conexiones de pool
    min: parseInt(process.env.DB_POOL_MIN || '5'),
    // Tiempo maximo de conexión en reposo antes de desconexión
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000'),
    // Tiempo maximo de espera para conexión de pool
    connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT || '2000'),
    // Tiempo maximo de conexión que puede existir
    maxLifetimeMillis: parseInt(process.env.DB_POOL_MAX_LIFETIME || '600000'),
  },
}); 