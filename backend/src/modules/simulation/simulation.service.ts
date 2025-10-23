import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { SimulationLesson } from "./entities/simulation-lesson.entity"
import { UserProgress } from "./entities/user-progress.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class SimulationService {
  constructor(
    @InjectRepository(SimulationLesson)
    private lessonsRepository: Repository<SimulationLesson>,
    @InjectRepository(UserProgress)
    private progressRepository: Repository<UserProgress>,
  ) {}

  async getAllLessons() {
    return this.lessonsRepository.find({ order: { order: "ASC" } })
  }

  async getLessonById(id: string) {
    return this.lessonsRepository.findOne({ where: { id } })
  }

  async getUserProgress(userId: string) {
    return this.progressRepository.find({ where: { userId } })
  }

  async markLessonComplete(userId: string, lessonId: string, score: number) {
    const progress = await this.progressRepository.findOne({
      where: { userId, lessonId },
    })

    if (progress) {
      progress.completed = true
      progress.score = score
      progress.completedAt = new Date()
      return this.progressRepository.save(progress)
    }

    const newProgress = this.progressRepository.create({
      userId,
      lessonId,
      completed: true,
      score,
      completedAt: new Date(),
    })

    return this.progressRepository.save(newProgress)
  }
}