# Nex Trade Wave 🌊 Backend

A comprehensive cryptocurrency trading platform backend built with Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Two-factor authentication (2FA)
  - Password reset functionality
  - Role-based access control

- **Trading Engine**
  - Real-time order matching
  - Multiple order types (market, limit, stop-loss)
  - Order book management
  - Trade execution and settlement

- **Wallet Management**
  - Multi-currency wallet support
  - Deposit and withdrawal functionality
  - Balance tracking and history
  - Security features

- **Market Data**
  - Real-time price feeds
  - Historical data (OHLCV)
  - Market statistics
  - Trading pair management

- **Admin Panel**
  - User management
  - Market administration
  - Platform statistics
  - System monitoring

- **Security Features**
  - Rate limiting
  - Input validation
  - SQL injection prevention
  - XSS protection
  - CORS configuration

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis
- **Authentication**: JWT + bcrypt
- **Real-time**: Socket.IO
- **Validation**: express-validator
- **Logging**: Winston
- **Testing**: Jest + Supertest

## Installation

### Prerequisites

- Node.js 18 or higher
- MongoDB 5.0 or higher
- Redis 6.0 or higher

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nairo-exchange-backend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Start MongoDB and Redis**
   \`\`\`bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   docker run -d -p 6379:6379 --name redis redis:7.2-alpine
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

6. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

### Docker Deployment

1. **Using Docker Compose**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. **Seed the database**
   \`\`\`bash
   docker-compose exec backend npm run seed
   \`\`\`

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/setup-2fa` - Setup two-factor authentication
- `POST /api/auth/verify-2fa` - Verify and enable 2FA

### Trading Endpoints

- `POST /api/trading/order` - Place new order
- `GET /api/trading/orders` - Get user orders
- `DELETE /api/trading/order/:orderId` - Cancel order
- `GET /api/trading/trades` - Get user trades
- `GET /api/trading/orderbook/:tradingPair` - Get order book

### Wallet Endpoints

- `GET /api/wallet` - Get user wallets
- `GET /api/wallet/:currency` - Get specific wallet
- `POST /api/wallet/deposit` - Deposit funds
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/wallet/transactions` - Get transaction history

### Market Data Endpoints

- `GET /api/market` - Get all markets
- `GET /api/market/:symbol` - Get specific market
- `GET /api/market/:symbol/ticker` - Get 24h ticker
- `GET /api/market/:symbol/trades` - Get recent trades
- `GET /api/market/:symbol/klines` - Get candlestick data

## Configuration

### Environment Variables

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/nairo-exchange
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
\`\`\`

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **JWT Secret**: Use a strong, randomly generated secret
3. **Rate Limiting**: Configure appropriate limits for your use case
4. **CORS**: Restrict origins in production
5. **HTTPS**: Always use HTTPS in production
6. **Database Security**: Use authentication and encryption
7. **Input Validation**: All inputs are validated and sanitized

## Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js
\`\`\`

## Monitoring and Logging

- **Logs**: Stored in `/logs` directory
- **Health Check**: `GET /api/health`
- **Metrics**: Platform statistics via admin endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@nairoexchange.com
- Documentation: [API Docs](https://docs.nairoexchange.com)
- Issues: [GitHub Issues](https://github.com/nairo-exchange/backend/issues)
\`\`\`

This comprehensive backend provides all the essential functionality for a cryptocurrency trading platform, including user management, trading engine, wallet operations, market data, and administrative features. The code is production-ready with proper security measures, error handling, and scalability considerations.
