import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./modules/auth/auth.module"
import { UsersModule } from "./modules/users/users.module"
import { TradingModule } from "./modules/trading/trading.module"
import { SimulationModule } from "./modules/simulation/simulation.module"
import { AnalyticsModule } from "./modules/analytics/analytics.module"
import { GovernanceModule } from "./modules/governance/governance.module"
import { WalletModule } from "./modules/wallet/wallet.module"
import { ApiKeyModule } from "./modules/api-key/api-key.module"
import { ScheduleModule } from "@nestjs/schedule"

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT ?? "5432"),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "nex_trade_wave",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV !== "production",
      logging: process.env.NODE_ENV !== "production",
    }),
    AuthModule,
    UsersModule,
    TradingModule,
    SimulationModule,
    AnalyticsModule,
    GovernanceModule,
    WalletModule,
    ApiKeyModule
  ],
})
export class AppModule {}
