import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ HttpModule.register({
    baseURL: "http://localhost:5000", //process.env.SERVIDOR_API
    maxBodyLength: 5000,
    maxContentLength: 50,
  })],
  controllers: [TransaccionController],
  providers: [TransaccionService],
})
export class TransaccionModule {}
