import { IsString, IsNumber, IsBoolean, IsEnum } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
  @ApiProperty({ example: "BTC/USD" })
  @IsString()
  symbol: string

  @ApiProperty({ enum: ["buy", "sell"] })
  @IsEnum(["buy", "sell"])
  type: string

  @ApiProperty({ example: 0.5 })
  @IsNumber()
  quantity: number

  @ApiProperty({ example: 45000 })
  @IsNumber()
  price: number

  @ApiProperty({ example: false })
  @IsBoolean()
  isSimulation: boolean
}
