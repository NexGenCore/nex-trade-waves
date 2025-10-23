import { IsString, IsArray, IsOptional, IsDate } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateApiKeyDto {
  @ApiProperty({ example: "Trading API Key" })
  @IsString()
  name: string

  @ApiProperty({ example: ["read:trading", "write:trading"] })
  @IsArray()
  scopes: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  expiresAt?: Date
}
