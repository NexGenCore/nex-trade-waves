import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TradingService } from "./trading.service"
import { TradingController } from "./trading.controller"
import { Order } from "./entities/order.entity"
import { Portfolio } from "./entities/portfolio.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Order, Portfolio])],
  controllers: [TradingController],
  providers: [TradingService],
  exports: [TradingService],
})
export class TradingModule {}
