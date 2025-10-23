import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GovernanceService } from "./governance.service"
import { GovernanceController } from "./governance.controller"
import { Proposal } from "./entities/proposal.entity"
import { Vote } from "./entities/vote.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Proposal, Vote])],
  controllers: [GovernanceController],
  providers: [GovernanceService],
  exports: [GovernanceService],
})
export class GovernanceModule {}
