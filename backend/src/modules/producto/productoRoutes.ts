import { Router } from 'express';
import { ProductoController } from './ProductoController';

const router = Router();
const productoController = new ProductoController();

// GET /api/productos - Obtiene todos los productos
router.get('/', (req, res) => productoController.getAll(req, res));

// GET /api/productos/:id - Obtiene productos por id
router.get('/:id(\\d+)', (req, res) => productoController.getById(req, res));

// POST /api/productos - Crea nuevo producto
router.post('/', (req, res) => productoController.create(req, res));

export default router; 