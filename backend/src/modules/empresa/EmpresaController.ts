import { Request, Response } from 'express';
import { EmpresaService } from './EmpresaService';
import { CreateEmpresaDto } from './EmpresaDto';
import { createResponseObject } from '../../common/helpers/response.helper';

export class EmpresaController {
  private empresaService: EmpresaService;

  constructor() {
    this.empresaService = new EmpresaService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const empresas = await this.empresaService.findAll();
      const response = createResponseObject({
        success: true,
        payload: empresas,
        status: 200,
        message: 'Empresas obtenidas correctamente'
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
      const empresa = await this.empresaService.findById(id);
      
      if (!empresa) {
        const response = createResponseObject({
          success: false,
          payload: null,
          status: 404,
          message: 'Empresa no encontrada'
        }, req);
        
        res.status(404).json(response);
        return;
      }
      
      const response = createResponseObject({
        success: true,
        payload: empresa,
        status: 200,
        message: 'Empresa obtenida correctamente'
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
      const createEmpresaDto: CreateEmpresaDto = req.body;
      const empresa = await this.empresaService.create(createEmpresaDto);
      const response = createResponseObject({
        success: true,
        payload: empresa,
        status: 201,
        message: 'Empresa creada correctamente'
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
        console.log(error)
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