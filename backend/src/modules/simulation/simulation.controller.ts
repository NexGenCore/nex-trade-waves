import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import { SimulationService } from "./simulation.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("simulation")
@Controller("simulation")
export class SimulationController {
  constructor(private simulationService: SimulationService) {}

  @Get("lessons")
  async getAllLessons() {
    return this.simulationService.getAllLessons()
  }

  @Get("lessons/:id")
  async getLesson(@Param("id") id: string) {
    return this.simulationService.getLessonById(id)
  }

  @Get("progress")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserProgress(@Request() req: ExpressRequest) {
    return this.simulationService.getUserProgress((req.user as any).userId)
  }

  @Post("progress/:lessonId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async markLessonComplete(
    @Request() req: ExpressRequest,
    @Param("lessonId") lessonId: string,
    @Body() body: { score: number },
  ) {
    return this.simulationService.markLessonComplete((req.user as any).userId, lessonId, body.score)
  }
}