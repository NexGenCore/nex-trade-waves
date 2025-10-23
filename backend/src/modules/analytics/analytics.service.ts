import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { Analytics } from "./entities/analytics.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>
  ) {}

  async trackEvent(userId: string, eventType: string, metadata?: any, value?: number) {
    const analytics = this.analyticsRepository.create({
      userId,
      eventType,
      metadata,
      value,
    })

    return this.analyticsRepository.save(analytics)
  }

  async getUserAnalytics(userId: string, eventType?: string) {
    const query = this.analyticsRepository
      .createQueryBuilder("analytics")
      .where("analytics.userId = :userId", { userId })

    if (eventType) {
      query.andWhere("analytics.eventType = :eventType", { eventType })
    }

    return query.orderBy("analytics.createdAt", "DESC").getMany()
  }

  async getAggregatedStats(userId: string) {
    const trades = await this.analyticsRepository.count({
      where: { userId, eventType: "trade" },
    })

    const lessonsCompleted = await this.analyticsRepository.count({
      where: { userId, eventType: "lesson_completed" },
    })

    return { trades, lessonsCompleted }
  }
}