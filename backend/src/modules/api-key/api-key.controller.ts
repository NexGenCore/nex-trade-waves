import { Controller, Post, Get, Put, Param, Body, UseGuards, Request } from "@nestjs/common"
import { ApiKeyService } from "./api-key.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CreateApiKeyDto } from "./dto/create-api-key.dto"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("api-keys")
@Controller("api-keys")
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createApiKey(@Body() createApiKeyDto: CreateApiKeyDto, @Request() req: ExpressRequest) {
    return this.apiKeyService.createApiKey(
      (req.user as any).userId,
      createApiKeyDto.name,
      createApiKeyDto.scopes,
      createApiKeyDto.expiresAt,
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserApiKeys(@Request() req: ExpressRequest) {
    return this.apiKeyService.getUserApiKeys((req.user as any).userId)
  }

  @Put(":id/revoke")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async revokeApiKey(@Param("id") id: string) {
    return this.apiKeyService.revokeApiKey(id)
  }

  @Put(":id/rotate")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async rotateApiKey(@Param("id") id: string) {
    return this.apiKeyService.rotateApiKey(id)
  }
}