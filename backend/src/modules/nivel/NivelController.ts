import { Request, Response } from 'express';
import { NivelService } from './NivelService';
import { NivelResponseDto } from './NivelDto';
import { createResponseObject } from '../../common/helpers/response.helper';

export class NivelController {
  private nivelService: NivelService;

  constructor() {
    this.nivelService = new NivelService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const niveles = await this.nivelService.findAll();
      const response = createResponseObject({
        success: true,
        payload: niveles,
        status: 200,
        message: 'Niveles obtenidos correctamente'
      }, req);
      
      res.status(200).json(response);
    } catch (error) {
      const response = createResponseObject({
        success: false,
        payload: null,
        status: 500,
        message: 'Internal server error'
      }, req);
      
      res.status(500).json(response);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const nivel = await this.nivelService.findById(id);
      
      if (!nivel) {
        const response = createResponseObject({
          success: false,
          payload: null,
          status: 404,
          message: 'Nivel no encontrado'
        }, req);
        
        res.status(404).json(response);
        return;
      }
      
      const response = createResponseObject({
        success: true,
        payload: nivel,
        status: 200,
        message: 'Nivel obtenido correctamente'
      }, req);
        
      res.status(200).json(response);
    } catch (error) {
      const response = createResponseObject({
        success: false,
        payload: null,
        status: 500,
        message: 'Internal server error'
      }, req);
      
      res.status(500).json(response);
    }
  }
} 