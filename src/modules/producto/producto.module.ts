import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity'; // Verifica que la ruta de tu entidad sea correcta

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // <-- Esta línea es la que te falta
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}