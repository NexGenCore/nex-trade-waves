import { IsEmail, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
  @ApiProperty({ 
    example: "John Doe",
    description: "User's full name",
    minLength: 1
  })
  @IsString()
  name: string

  @ApiProperty({ 
    example: "user@example.com",
    description: "User's email address (must be unique)",
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