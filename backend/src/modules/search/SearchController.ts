import { Request, Response } from 'express';
import { SearchService } from './SearchService';
import { createResponseObject } from '../../common/helpers/response.helper';

export class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  async search(req: Request, res: Response) {
    const query = req.query.q as string;
    if (!query || query.trim() === '') {
      const response = createResponseObject({
        success: false,
        payload: null,
        status: 400,
        message: 'Parametro de busqueda requerido.'
      }, req);
      return res.status(400).json(response);
    }

    const { productos, empresas } = await this.searchService.search(query);

    if ((!productos || productos.length === 0) && (!empresas || empresas.length === 0)) {
      const response = createResponseObject({
        success: false,
        payload: null,
        status: 404,
        message: 'No se encontraron productos o empresas.'
      }, req);
      return res.status(404).json(response);
    }

    const payload: any = {};
    if (productos && productos.length > 0) payload.productos = productos;
    if (empresas && empresas.length > 0) payload.empresas = empresas;

    const response = createResponseObject({
      success: true,
      payload,
      status: 200,
      message: 'Busqueda realizada correctamente'
    }, req);
    return res.status(200).json(response);
  }
} 