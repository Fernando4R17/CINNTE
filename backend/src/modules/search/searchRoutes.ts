import { Router } from 'express';
import { SearchController } from './SearchController';

const router = Router();
const searchController = new SearchController();

// GET /api/search?q= - Hace busqueda mediante query
router.get('/', (req, res) => searchController.search(req, res));

export default router; 