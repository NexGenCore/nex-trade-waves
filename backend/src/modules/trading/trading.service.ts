import { Injectable, Inject } from "@nestjs/common"
import { Repository } from "typeorm"
import { Order } from "./entities/order.entity"
import { Portfolio } from "./entities/portfolio.entity"
import { CreateOrderDto } from "./dto/create-order.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TradingService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const total = createOrderDto.quantity * createOrderDto.price
    const order = this.ordersRepository.create({
      userId,
      ...createOrderDto,
      total,
      status: "pending",
    })

    return this.ordersRepository.save(order)
  }

  async getOrders(userId: string, isSimulation = false) {
    return this.ordersRepository.find({
      where: { userId, isSimulation },
      order: { createdAt: "DESC" },
    })
  }

  async getPortfolio(userId: string, isSimulation = false) {
    return this.portfolioRepository.find({
      where: { userId, isSimulation },
    })
  }

  async updateOrderStatus(orderId: string, status: string) {
    await this.ordersRepository.update(orderId, { status })
    return this.ordersRepository.findOne({ where: { id: orderId } })
  }

  async getOrderById(orderId: string) {
    return this.ordersRepository.findOne({ where: { id: orderId } })
  }
}