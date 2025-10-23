import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SimulationService } from "./simulation.service"
import { SimulationController } from "./simulation.controller"
import { SimulationLesson } from "./entities/simulation-lesson.entity"
import { UserProgress } from "./entities/user-progress.entity"

@Module({
  imports: [TypeOrmModule.forFeature([SimulationLesson, UserProgress])],
  controllers: [SimulationController],
  providers: [SimulationService],
  exports: [SimulationService],
})
export class SimulationModule {}
