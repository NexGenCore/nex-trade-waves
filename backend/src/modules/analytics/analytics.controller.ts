import { Controller, Get, UseGuards } from "@nestjs/common"
import { AnalyticsService } from "./analytics.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get("stats")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getStats(req: ExpressRequest) {
    return this.analyticsService.getAggregatedStats((req.user as any).userId)
  }

  @Get("events")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserAnalytics(req: ExpressRequest) {
    return this.analyticsService.getUserAnalytics((req.user as any).userId)
  }
}