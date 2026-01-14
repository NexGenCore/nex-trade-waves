import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import { SimulationService } from "./simulation.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("simulation")
@Controller("simulation")
export class SimulationController {
  constructor(private simulationService: SimulationService) {}

  @Get("lessons")
  @ApiOperation({ 
    summary: 'Get all simulation lessons',
    description: 'Retrieve a list of all available trading simulation lessons'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lessons retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          title: "Introduction to Cryptocurrency Trading",
          description: "Learn the basics of cryptocurrency trading",
          difficulty: "beginner",
          content: "Lesson content goes here...",
          videoUrl: "https://example.com/video.mp4",
          order: 1,
          createdAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          title: "Advanced Trading Strategies",
          description: "Learn advanced trading strategies",
          difficulty: "advanced",
          content: "Lesson content goes here...",
          videoUrl: "https://example.com/video2.mp4",
          order: 2,
          createdAt: "2025-10-27T10:00:00.000Z"
        }
      ]
    }
  })
  async getAllLessons() {
    return this.simulationService.getAllLessons()
  }

  @Get("lessons/:id")
  @ApiOperation({ 
    summary: 'Get simulation lesson by ID',
    description: 'Retrieve a specific trading simulation lesson by its ID'
  })
  @ApiParam({ name: 'id', description: 'Lesson ID (UUID)', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lesson retrieved successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Introduction to Cryptocurrency Trading",
        description: "Learn the basics of cryptocurrency trading",
        difficulty: "beginner",
        content: "Lesson content goes here...",
        videoUrl: "https://example.com/video.mp4",
        order: 1,
        createdAt: "2025-10-27T10:00:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not Found - Lesson not found' 
  })
  async getLesson(@Param("id") id: string) {
    return this.simulationService.getLessonById(id)
  }

  @Get("progress")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user progress',
    description: 'Retrieve the simulation lesson progress for the currently authenticated user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Progress retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          lessonId: "123e4567-e89b-12d3-a456-426614174002",
          completed: true,
          score: 95,
          completedAt: "2025-10-27T10:00:00.000Z",
          createdAt: "2025-10-25T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          userId: "123e4567-e89b-12d3-a456-426614174001",
          lessonId: "123e4567-e89b-12d3-a456-426614174003",
          completed: false,
          score: 0,
          completedAt: null,
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
  async getUserProgress(@Request() req: ExpressRequest) {
    return this.simulationService.getUserProgress((req.user as any).userId)
  }

  @Post("progress/:lessonId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Mark lesson as complete',
    description: 'Mark a simulation lesson as complete for the currently authenticated user'
  })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID (UUID)', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ 
    status: 201, 
    description: 'Lesson marked as complete',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "123e4567-e89b-12d3-a456-426614174001",
        lessonId: "123e4567-e89b-12d3-a456-426614174002",
        completed: true,
        score: 95,
        completedAt: "2025-10-27T10:00:00.000Z",
        createdAt: "2025-10-25T10:00:00.000Z",
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
    status: 404, 
    description: 'Not Found - Lesson not found' 
  })
  async markLessonComplete(
    @Request() req: ExpressRequest,
    @Param("lessonId") lessonId: string,
    @Body() body: { score: number },
  ) {
    return this.simulationService.markLessonComplete((req.user as any).userId, lessonId, body.score)
  }
}