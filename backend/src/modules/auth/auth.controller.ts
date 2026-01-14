import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Creates a new user account in the system. Returns user details and authentication token.'
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      example: {
        user: {
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
        },
        token: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          expires_in: 86400
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Email already exists' 
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Login user',
    description: 'Authenticate user with email and password. Returns authentication token and user details.'
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully authenticated',
    schema: {
      example: {
        user: {
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
        },
        token: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          expires_in: 86400
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid credentials' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed' 
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}