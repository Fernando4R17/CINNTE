import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';

// Import routes
import nivelRoutes from './modules/nivel/nivelRoutes';
import empresaRoutes from './modules/empresa/empresaRoutes';
import bancoRoutes from './modules/banco/bancoRoutes';
import productoRoutes from './modules/producto/productoRoutes';
import searchRoutes from './modules/search/searchRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/niveles', nivelRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/bancos', bancoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/search', searchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' , message: 'API is running' })
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
      message: 'API Documentation',
      endpoints: {
        niveles: {
          'GET /api/niveles': 'Obtiene todos los niveles',
          'GET /api/niveles/:id': 'Obtiene nivel por id'
        },
        empresas: {
          'GET /api/empresas': 'Obtiene todas las empresas',
          'GET /api/empresas/:id': 'Obtiene empresas por id',
          'POST /api/empresas': 'Crea nueva empresa'
        },
        bancos: {
          'GET /api/bancos': 'Obtiene todos los bancos',
          'GET /api/bancos/:id': 'Obtiene banco por id',
          'POST /api/bancos': 'Crea nuevo banco'
        },
        productos: {
          'GET /api/productos': 'Obtiene todos los productos',
          'GET /api/productos/:id': 'Obtiene productos por id',
          'POST /api/productos': 'Obtiene nuevos productos'
        },
        search: {
          'GET /api/search?q=': 'Hace busqueda mediante query',
        }
      }
    });
});
    

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.json({ status: 'error' , message: 'Something went wrong!' })
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ status: 'error' , message: 'Route not found' })
});

// Inicializa base de datos y servidor
async function startServer() {
  try {
    await AppDataSource.initialize();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api`);
      console.log(`Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 