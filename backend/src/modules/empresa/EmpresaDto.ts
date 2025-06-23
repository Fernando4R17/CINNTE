import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  domicilio!: string;

  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @IsEmail()
  @IsNotEmpty()
  correo!: string;

  @IsNumber()
  @IsNotEmpty()
  idNivel!: number;
}

export class EmpresaResponseDto {
  @IsNumber()
  idEmpresa!: number;

  @IsString()
  nombre!: string;

  @IsString()
  domicilio!: string;

  @IsString()
  telefono!: string;

  @IsString()
  correo!: string;

  @IsNumber()
  idNivel!: number;
} 