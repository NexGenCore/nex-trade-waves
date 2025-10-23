import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { Wallet } from "./entities/wallet.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>
  ) {}

  async createWallet(userId: string, address: string, chainId: string) {
    const wallet = this.walletsRepository.create({
      userId,
      address,
      chainId,
    })

    return this.walletsRepository.save(wallet)
  }

  async getUserWallets(userId: string) {
    return this.walletsRepository.find({ where: { userId } })
  }

  async getWalletByAddress(address: string) {
    return this.walletsRepository.findOne({ where: { address } })
  }

  async updateWalletBalance(walletId: string, balance: number) {
    await this.walletsRepository.update(walletId, { balance })
    return this.walletsRepository.findOne({ where: { id: walletId } })
  }
}