import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  alias!: string;

  @IsNumber()
  @IsNotEmpty()
  idEmpresa!: number;
}

export class ProductoResponseDto {
  @IsNumber()
  idProducto!: number;

  @IsString()
  codigo!: string;

  @IsString()
  nombre!: string;

  @IsString()
  alias!: string;

  @IsNumber()
  idEmpresa!: number;
}

export class ProductoWithRelationsDto extends ProductoResponseDto {
  empresa!: {
    idEmpresa: number;
    nombre: string;
    domicilio: string;
    telefono: string;
    correo: string;
    nivel: {
      idNivel: number;
      nombre: string;
    };
  };
} 