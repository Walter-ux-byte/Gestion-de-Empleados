import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
  nombres!: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo apellidos es obligatorio' })
  apellidos!: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsEmail()
  mail?: string;
}
