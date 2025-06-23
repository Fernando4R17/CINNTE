import { Router } from 'express';
import { NivelController } from './NivelController';

const router = Router();
const nivelController = new NivelController();

// GET /api/niveles - Obtiene todos los niveles
router.get('/', (req, res) => nivelController.getAll(req, res));

// GET /api/niveles/:id - Obtiene nivel por id
router.get('/:id(\\d+)', (req, res) => nivelController.getById(req, res));

export default router; 