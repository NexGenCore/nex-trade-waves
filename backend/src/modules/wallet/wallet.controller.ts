import { Controller, Post, Get, UseGuards, Request } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateWalletDto } from "./dto/create-wallet.dto"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("wallet")
@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createWallet(createWalletDto: CreateWalletDto, @Request() req: ExpressRequest) {
    return this.walletService.createWallet((req.user as any).userId, createWalletDto.address, createWalletDto.chainId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserWallets(@Request() req: ExpressRequest) {
    return this.walletService.getUserWallets((req.user as any).userId)
  }
}