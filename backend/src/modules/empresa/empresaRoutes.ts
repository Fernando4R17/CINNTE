import { Router } from 'express';
import { EmpresaController } from './EmpresaController';

const router = Router();
const empresaController = new EmpresaController();

// GET /api/empresas - Obtiene todas las empresas
router.get('/', (req, res) => empresaController.getAll(req, res));

// GET /api/empresas/:id - Obtiene empresa por id
router.get('/:id(\\d+)', (req, res) => empresaController.getById(req, res));

// POST /api/empresas - Crea nueva empresa
router.post('/', (req, res) => empresaController.create(req, res));

export default router; 