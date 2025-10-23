import { Injectable, BadRequestException } from "@nestjs/common"
import { Repository } from "typeorm"
import { Proposal } from "./entities/proposal.entity"
import { Vote } from "./entities/vote.entity"
import { CreateProposalDto } from "./dto/create-proposal.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class GovernanceService {
  constructor(
    @InjectRepository(Proposal)
    private proposalsRepository: Repository<Proposal>,
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>
  ) {}

  async createProposal(userId: string, createProposalDto: CreateProposalDto) {
    const proposal = this.proposalsRepository.create({
      ...createProposalDto,
      proposerId: userId,
      votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })

    return this.proposalsRepository.save(proposal)
  }

  async getAllProposals() {
    return this.proposalsRepository.find({ order: { createdAt: "DESC" } })
  }

  async getProposalById(id: string) {
    return this.proposalsRepository.findOne({ where: { id } })
  }

  async vote(proposalId: string, userId: string, vote: boolean) {
    const proposal = await this.getProposalById(proposalId)
    if (!proposal) {
      throw new BadRequestException("Proposal not found")
    }

    const existingVote = await this.votesRepository.findOne({
      where: { proposalId, voterId: userId },
    })

    if (existingVote) {
      throw new BadRequestException("User has already voted on this proposal")
    }

    const voteRecord = this.votesRepository.create({
      proposalId,
      voterId: userId,
      vote,
    })

    await this.votesRepository.save(voteRecord)

    if (vote) {
      proposal.votesFor++
    } else {
      proposal.votesAgainst++
    }

    return this.proposalsRepository.save(proposal)
  }
}