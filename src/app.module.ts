import { Module } from '@nestjs/common';
import { TransaccionModule } from './transaccion/transaccion.module';

@Module({
  imports: [ TransaccionModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
