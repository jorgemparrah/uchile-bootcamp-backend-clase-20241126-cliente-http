import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Transaccion } from './entities/transaccion.entity';
import { GetTransaccionDto } from './dto/get-transaccion.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class TransaccionService {

  private readonly transacciones = [];

  constructor(
    private readonly httpService: HttpService
  ) {}

  async create(createTransaccionDto: CreateTransaccionDto): Promise<GetTransaccionDto> {
    const url = `/usuario/${createTransaccionDto.idPropietario}`;
    console.log(url);

    const promesa : Promise<AxiosResponse> = firstValueFrom(
      this.httpService.get(url)
      // this.httpService.request({
      //   method: 'GET',
      //   url: url
      // });
    );
    const valor : AxiosResponse = await promesa;
    console.log("status", valor.status);
    console.log("statusText", valor.statusText);
    console.log("data", valor.data);
    console.log("headers", valor.headers);

    const transaccion = new Transaccion();
    transaccion.id = Math.random().toString(36).substring(7);
    transaccion.fecha = (new Date()).toUTCString();
    transaccion.monto = createTransaccionDto.monto;
    transaccion.tipo = createTransaccionDto.tipo;
    transaccion.idCuenta = createTransaccionDto.idCuenta;
    transaccion.idPropietario = createTransaccionDto.idPropietario;
    this.transacciones.push(transaccion);
    return transaccion;
  }

  async findAll(): Promise<GetTransaccionDto[]> {
    const jwt = await this.getJwt();

    const url = `/usuario`;
    try {
      const response : AxiosResponse = await firstValueFrom(
        this.httpService.request({
          method: 'POST',
          url: url,
          data: {
            nombre: "Jorge",
            apellido: "Parra",
            password: "987654",
          },
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
      );
      if (response.status >= 400) {
        throw new ForbiddenException();
      }
    } catch (error) {
      throw new ForbiddenException();
    }
    return this.transacciones;
  }

  desencriptar() {
    // const x = this.desencriptar("ikofh90834908ty987fh03497gh98435hg987hy");
    // x = "49879468498798496";
    return "49879468498798496";
  }

  private async getJwt(): Promise<string> {
    const url = `/usuario/login`;
    try {
      const response : AxiosResponse = await firstValueFrom(
        this.httpService.post(url,
          {
            id: 467989,
            password: this.desencriptar(),
          },
          {
            timeout: 1000
          }
        )
      );
      if (response.status >= 400) {
        throw new ForbiddenException();
      }
      return response.data;
    } catch (error) {
      console.log(error)
      throw new ForbiddenException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaccion`;
  }

  update(id: number, updateTransaccionDto: UpdateTransaccionDto) {
    return `This action updates a #${id} transaccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccion`;
  }
}
