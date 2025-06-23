import { Request, Response } from 'express';
import { ProductoService } from './ProductoService';
import { CreateProductoDto } from './ProductoDto';
import { createResponseObject } from '../../common/helpers/response.helper';

export class ProductoController {
  private productoService: ProductoService;

  constructor() {
    this.productoService = new ProductoService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const productos = await this.productoService.findAllWithRelations();
      const response = createResponseObject({
        success: true,
        payload: productos,
        status: 200,
        message: 'Productos obtenidos correctamente'
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
      const producto = await this.productoService.findByIdWithRelations(id);
      
      if (!producto) {
        const response = createResponseObject({
          success: false,
          payload: null,
          status: 404,
          message: 'Producto no encontrado'
        }, req);
        
        res.status(404).json(response);
        return;
      }
      
      const response = createResponseObject({
        success: true,
        payload: producto,
        status: 200,
        message: 'Producto obtenido correctamente'
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
      const createProductoDto: CreateProductoDto = req.body;
      const producto = await this.productoService.create(createProductoDto);
      const response = createResponseObject({
        success: true,
        payload: producto,
        status: 201,
        message: 'Producto creado correctamente'
      }, req);
      
      res.status(201).json(response);
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