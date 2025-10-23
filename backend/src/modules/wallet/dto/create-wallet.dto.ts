import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateWalletDto {
  @ApiProperty({ example: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE" })
  @IsString()
  address: string

  @ApiProperty({ example: "ethereum" })
  @IsString()
  chainId: string
}
