import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateWalletDto } from "./dto/create-wallet.dto"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("wallet")
@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Create a new wallet',
    description: 'Associate a blockchain wallet address with the current user account'
  })
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Wallet created successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "123e4567-e89b-12d3-a456-426614174001",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE",
        chainId: "ethereum",
        status: "active",
        balance: 0,
        publicKey: null,
        createdAt: "2025-10-27T10:00:00.000Z",
        updatedAt: "2025-10-27T10:00:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Wallet already associated with another user' 
  })
  async createWallet(@Body() createWalletDto: CreateWalletDto, @Request() req: ExpressRequest) {
    return this.walletService.createWallet((req.user as any).userId, createWalletDto.address, createWalletDto.chainId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user wallets',
    description: 'Retrieve all blockchain wallets associated with the current user account'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Wallets retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE",
          chainId: "ethereum",
          status: "active",
          balance: 1.5,
          publicKey: null,
          createdAt: "2025-10-27T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
          chainId: "polygon",
          status: "active",
          balance: 100,
          publicKey: null,
          createdAt: "2025-10-26T10:00:00.000Z",
          updatedAt: "2025-10-26T10:00:00.000Z"
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  async getUserWallets(@Request() req: ExpressRequest) {
    return this.walletService.getUserWallets((req.user as any).userId)
  }
}