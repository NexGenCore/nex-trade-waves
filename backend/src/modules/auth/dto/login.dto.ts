import { IsEmail, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({ 
    example: "user@example.com",
    description: "User's email address",
    format: "email"
  })
  @IsEmail()
  email: string

  @ApiProperty({ 
    example: "password123",
    description: "User's password (min 6 characters)",
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string
}