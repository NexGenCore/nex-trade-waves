import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { ApiKey } from "./entities/api-key.entity"
import { v4 as uuidv4 } from "uuid"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeysRepository: Repository<ApiKey>
  ) {}

  async createApiKey(userId: string, name: string, scopes: string[], expiresAt?: Date) {
    const key = `nex_${uuidv4()}`
    const apiKey = this.apiKeysRepository.create({
      userId,
      key,
      name,
      scopes,
      expiresAt,
      rateLimit: 100, // default 100 requests per minute
    })

    return this.apiKeysRepository.save(apiKey)
  }

  async getUserApiKeys(userId: string) {
    return this.apiKeysRepository.find({ where: { userId } })
  }

  async validateApiKey(key: string) {
    const apiKey = await this.apiKeysRepository.findOne({ where: { key } })

    if (!apiKey || !apiKey.isActive) {
      return null
    }

    if (apiKey.expiresAt && new Date() > apiKey.expiresAt) {
      return null
    }

    return apiKey
  }

  async revokeApiKey(keyId: string) {
    await this.apiKeysRepository.update(keyId, { isActive: false })
    return this.apiKeysRepository.findOne({ where: { id: keyId } })
  }

  async rotateApiKey(keyId: string) {
    const newKey = `nex_${uuidv4()}`
    await this.apiKeysRepository.update(keyId, { key: newKey })
    return this.apiKeysRepository.findOne({ where: { id: keyId } })
  }
}