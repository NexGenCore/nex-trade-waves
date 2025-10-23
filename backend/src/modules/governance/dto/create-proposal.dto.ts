import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProposalDto {
  @ApiProperty({ example: "Add new trading pair" })
  @IsString()
  title: string

  @ApiProperty({ example: "Proposal to add ETH/GBP trading pair" })
  @IsString()
  description: string
}
