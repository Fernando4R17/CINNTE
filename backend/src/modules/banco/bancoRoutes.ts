import { Router } from 'express';
import { BancoController } from './BancoController';

const router = Router();
const bancoController = new BancoController();

// GET /api/bancos - Obtener todos los bancos
router.get('/', (req, res) => bancoController.getAll(req, res));

// GET /api/bancos/:id - Obtener banco por id
router.get('/:id(\\d+)', (req, res) => bancoController.getById(req, res));

// POST /api/bancos - Crear nuevo banco
router.post('/', (req, res) => bancoController.create(req, res));

export default router; 