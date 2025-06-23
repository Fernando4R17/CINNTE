import { Request, Response } from 'express';
import { BancoService } from './BancoService';
import { CreateBancoDto } from './BancoDto';
import { createResponseObject } from '../../common/helpers/response.helper';

export class BancoController {
  private bancoService: BancoService;

  constructor() {
    this.bancoService = new BancoService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const bancos = await this.bancoService.findAll();
      const response = createResponseObject({
        success: true,
        payload: bancos,
        status: 200,
        message: 'Bancos obtenidos correctamente'
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
      const banco = await this.bancoService.findById(id);
      
      if (!banco) {
        const response = createResponseObject({
          success: false,
          payload: null,
          status: 404,
          message: 'Banco no encontrado'
        }, req);
        
        res.status(404).json(response);
        return;
      }
      
      const response = createResponseObject({
        success: true,
        payload: banco,
        status: 200,
        message: 'Banco obtenido correctamente'
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

  async create(req: Request, res: Response) {
    try {
      const createBancoDto: CreateBancoDto = req.body;
      const banco = await this.bancoService.create(createBancoDto);
      const response = createResponseObject({
        success: true,
        payload: banco,
        status: 201,
        message: 'Banco creado existosamente'
      }, req);
      
      res.status(201).json(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('ya existe')) {
        const response = createResponseObject({
          success: false,
          payload: null,
          status: 400,
          message: error.message
        }, req);
        
        res.status(400).json(response);
      } else {
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
} 