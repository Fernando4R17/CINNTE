import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNivelDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}

export class NivelResponseDto {
  @IsNumber()
  idNivel!: number;

  @IsString()
  nombre!: string;
} 