import { Controller, Post, Get, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from "@nestjs/common"
import { TradingService } from "./trading.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateOrderDto } from "./dto/create-order.dto"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("trading")
@Controller("trading")
export class TradingController {
  constructor(private tradingService: TradingService) {}

  @Post("orders")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Create a new trading order',
    description: 'Create a new buy or sell order for a specific cryptocurrency pair'
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "123e4567-e89b-12d3-a456-426614174001",
        symbol: "BTC/USD",
        type: "buy",
        quantity: 0.5,
        price: 45000,
        total: 22500,
        status: "pending",
        isSimulation: false,
        chainId: "ethereum",
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
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req: ExpressRequest) {
    return this.tradingService.createOrder((req.user as any).userId, createOrderDto)
  }

  @Get("orders")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user orders',
    description: 'Retrieve all orders for the currently authenticated user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orders retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          symbol: "BTC/USD",
          type: "buy",
          quantity: 0.5,
          price: 45000,
          total: 22500,
          status: "pending",
          isSimulation: false,
          chainId: "ethereum",
          createdAt: "2025-10-27T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174002",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          symbol: "ETH/USD",
          type: "sell",
          quantity: 2.5,
          price: 2100,
          total: 5250,
          status: "filled",
          isSimulation: true,
          chainId: "ethereum",
          createdAt: "2025-10-26T10:00:00.000Z",
          updatedAt: "2025-10-26T10:05:00.000Z"
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  async getOrders(@Request() req: ExpressRequest) {
    return this.tradingService.getOrders((req.user as any).userId)
  }

  @Get("portfolio")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user portfolio',
    description: 'Retrieve the portfolio holdings for the currently authenticated user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Portfolio retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          symbol: "BTC",
          quantity: 1.5,
          averagePrice: 42000,
          currentPrice: 45000,
          isSimulation: false,
          createdAt: "2025-10-25T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          symbol: "ETH",
          quantity: 10,
          averagePrice: 2000,
          currentPrice: 2100,
          isSimulation: true,
          createdAt: "2025-10-20T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  async getPortfolio(@Request() req: ExpressRequest) {
    return this.tradingService.getPortfolio((req.user as any).userId)
  }

  @Get("orders/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get order by ID',
    description: 'Retrieve a specific order by its ID'
  })
  @ApiParam({ name: 'id', description: 'Order ID (UUID)', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order retrieved successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "123e4567-e89b-12d3-a456-426614174001",
        symbol: "BTC/USD",
        type: "buy",
        quantity: 0.5,
        price: 45000,
        total: 22500,
        status: "pending",
        isSimulation: false,
        chainId: "ethereum",
        createdAt: "2025-10-27T10:00:00.000Z",
        updatedAt: "2025-10-27T10:00:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not Found - Order not found' 
  })
  async getOrder(@Param("id") id: string) {
    return this.tradingService.getOrderById(id)
  }
}