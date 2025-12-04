import { ApiProperty } from "@nestjs/swagger";

export class CreateTransaccionDto {

   @ApiProperty({ example: 5000, description: "Monto de la transaccion" })
  monto: number;
   @ApiProperty({ example: "deposito o retiro", description: "Tipo de transaccion" })
  tipo: string;
   @ApiProperty({ example: "123456", description: "Id de la cuenta" })
  idCuenta: string;
   @ApiProperty({ example: 1, description: "Id del propietario" })
  idPropietario: number;

}
