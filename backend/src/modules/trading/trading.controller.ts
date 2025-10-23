import { Controller, Post, Get, Body, Param, UseGuards, Request } from "@nestjs/common"
import { TradingService } from "./trading.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateOrderDto } from "./dto/create-order.dto"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("trading")
@Controller("trading")
export class TradingController {
  constructor(private tradingService: TradingService) {}

  @Post("orders")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req: ExpressRequest) {
    return this.tradingService.createOrder((req.user as any).userId, createOrderDto)
  }

  @Get("orders")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getOrders(@Request() req: ExpressRequest) {
    return this.tradingService.getOrders((req.user as any).userId)
  }

  @Get("portfolio")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPortfolio(@Request() req: ExpressRequest) {
    return this.tradingService.getPortfolio((req.user as any).userId)
  }

  @Get("orders/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getOrder(@Param("id") id: string) {
    return this.tradingService.getOrderById(id)
  }
}