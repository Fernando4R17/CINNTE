import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBancoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  idNivel!: number;
}

export class BancoResponseDto {
  @IsNumber()
  idBanco!: number;

  @IsString()
  nombre!: string;

  @IsNumber()
  idNivel!: number;
} 