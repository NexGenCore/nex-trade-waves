import { Controller, Post, Get, Param, UseGuards, Request } from "@nestjs/common"
import { GovernanceService } from "./governance.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateProposalDto } from "./dto/create-proposal.dto"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("governance")
@Controller("governance")
export class GovernanceController {
  constructor(private governanceService: GovernanceService) {}

  @Post("proposals")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProposal(createProposalDto: CreateProposalDto, @Request() req: ExpressRequest) {
    return this.governanceService.createProposal((req.user as any).userId, createProposalDto)
  }

  @Get("proposals")
  async getAllProposals() {
    return this.governanceService.getAllProposals()
  }

  @Get("proposals/:id")
  async getProposal(@Param("id") id: string) {
    return this.governanceService.getProposalById(id)
  }

  @Post("proposals/:id/vote")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async vote(@Param("id") proposalId: string, body: { vote: boolean }, @Request() req: ExpressRequest) {
    return this.governanceService.vote(proposalId, (req.user as any).userId, body.vote)
  }
}