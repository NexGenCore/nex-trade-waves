// API service for connecting frontend to backend
// Backend does not use a global "/api" prefix (Swagger is served under /api/docs),
// so default to the backend root URL. Prefer configuring NEXT_PUBLIC_API_BASE_URL
// in your environment for different deployments.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  walletAddress?: string;
  simulationBalance: number;
  realBalance: number;
  emailVerified: boolean;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: {
    access_token: string;
    expires_in: number;
  };
}

export class ApiError extends Error {
  status: number
  details?: any

  constructor(message: string, status = 500, details?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

class ApiService {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let parsed: any = {}
      try {
        parsed = await response.json()
      } catch (e) {
        // ignore parse errors
      }
      const message = parsed?.message || parsed?.error || "Failed to login"
      throw new ApiError(message, response.status, parsed)
    }

    return response.json();
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let parsed: any = {}
      try {
        parsed = await response.json()
      } catch (e) {
        // ignore parse errors
      }
      const message = parsed?.message || parsed?.error || "Failed to register"
      throw new ApiError(message, response.status, parsed)
    }

    return response.json();
  }

  async getProfile(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch profile");
    }

    return response.json();
  }

  async updateProfile(token: string, data: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update profile");
    }

    return response.json();
  }

  async getPortfolio(token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/trading/portfolio`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch portfolio");
    }

    return response.json();
  }

  async getOrders(token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/trading/orders`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch orders");
    }

    return response.json();
  }

  async getUserWallets(token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/wallet`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch wallets");
    }

    return response.json();
  }

  /**
   * Request a password reset for the given email.
   * Note: backend may return 404/501 if not implemented; handle gracefully on the client.
   */
  async forgotPassword(email: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      let parsed: any = {}
      try {
        parsed = await response.json()
      } catch (e) {
        // ignore
      }
      const message = parsed?.message || parsed?.error || "Failed to request password reset"
      throw new ApiError(message, response.status, parsed)
    }

    return response.json()
  }
}

export const apiService = new ApiService();