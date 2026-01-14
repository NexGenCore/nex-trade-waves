import { Controller, Get, Put, Body, Param, UseGuards, Request } from "@nestjs/common"
import { UsersService } from "./users.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { Request as ExpressRequest } from "express"

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get current user profile',
    description: 'Retrieve the profile information of the currently authenticated user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        id: "uuid-string",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        walletAddress: null,
        simulationBalance: 10000,
        realBalance: 0,
        emailVerified: false,
        profileImage: null,
        bio: null,
        createdAt: "2025-10-27T10:00:00.000Z",
        updatedAt: "2025-10-27T10:00:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  async getProfile(@Request() req: ExpressRequest) {
    return this.usersService.findById((req.user as any).userId)
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Update current user profile',
    description: 'Update the profile information of the currently authenticated user'
  })
  @ApiBody({
    description: 'Profile update data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe Updated' },
        email: { type: 'string', format: 'email', example: 'john.updated@example.com' },
        profileImage: { type: 'string', example: 'https://example.com/image.jpg' },
        bio: { type: 'string', example: 'Crypto trader and educator' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile updated successfully',
    schema: {
      example: {
        id: "uuid-string",
        name: "John Doe Updated",
        email: "john.updated@example.com",
        role: "user",
        walletAddress: null,
        simulationBalance: 10000,
        realBalance: 0,
        emailVerified: false,
        profileImage: "https://example.com/image.jpg",
        bio: "Crypto trader and educator",
        createdAt: "2025-10-27T10:00:00.000Z",
        updatedAt: "2025-10-27T11:00:00.000Z"
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
  async updateProfile(@Request() req: ExpressRequest, @Body() updateData: any) {
    return this.usersService.update((req.user as any).userId, updateData)
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user by ID',
    description: 'Retrieve the profile information of a specific user by their ID'
  })
  @ApiParam({ name: 'id', description: 'User ID (UUID)', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ 
    status: 200, 
    description: 'User retrieved successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        walletAddress: null,
        simulationBalance: 10000,
        realBalance: 0,
        emailVerified: false,
        profileImage: null,
        bio: null,
        createdAt: "2025-10-27T10:00:00.000Z",
        updatedAt: "2025-10-27T10:00:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not Found - User not found' 
  })
  async getUser(@Param("id") id: string) {
    return this.usersService.findById(id)
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Retrieve a list of all users in the system (admin only)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Users retrieved successfully',
    schema: {
      example: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          walletAddress: null,
          simulationBalance: 10000,
          realBalance: 0,
          emailVerified: false,
          profileImage: null,
          bio: null,
          createdAt: "2025-10-27T10:00:00.000Z",
          updatedAt: "2025-10-27T10:00:00.000Z"
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "trader",
          walletAddress: "0x1234567890123456789012345678901234567890",
          simulationBalance: 15000,
          realBalance: 5000,
          emailVerified: true,
          profileImage: "https://example.com/jane.jpg",
          bio: "Professional crypto trader",
          createdAt: "2025-10-26T10:00:00.000Z",
          updatedAt: "2025-10-27T09:00:00.000Z"
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  async getAllUsers() {
    return this.usersService.findAll()
  }
}