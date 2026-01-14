# Nex Trade Wave Smart Contracts

Production-ready smart contracts for the Nex Trade Wave DeFi platform.

## Contracts Overview

### 1. NexTradeToken (ERC20)
- Native governance and utility token
- Max supply: 1 billion tokens
- Minter role for controlled token distribution
- Burn functionality for deflationary mechanics

### 2. NexTradingEngine
- Core trading contract for token swaps
- Liquidity pool management with constant product formula
- Platform fee collection (0.25% default)
- Trade history tracking per user
- Slippage protection

### 3. NexDAOGovernance
- Community-driven proposal and voting system
- Proposal creation with token threshold (1000 NXT)
- 7-day voting period
- Vote weight based on token balance
- Proposal execution by owner

### 4. NexStakingRewards
- Stake NXT tokens to earn rewards
- 7-day lock period for security
- Reward rate: ~100 tokens per day for 1M staked
- Automatic reward calculation
- Pending rewards view

### 5. NexLearningSimulation
- Track user learning progress
- Module-based educational system
- Difficulty-based reward distribution
- Simulation score tracking
- Active user metrics

### 6. NexMultiSigWallet
- Multi-signature wallet for secure asset management
- Configurable confirmation requirements
- Transaction submission and execution
- Confirmation revocation
- Ether and token support

### 7. NexAPIKeyManager
- API key generation and management
- Scope-based permissions (READ, WRITE, TRADE, ADMIN)
- Rate limiting per key
- Key rotation and revocation
- Expiration policies (1-365 days)

## Deployment

\`\`\`bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to network
npm run deploy
\`\`\`

## Security Features

- OpenZeppelin audited contracts
- ReentrancyGuard for critical functions
- Role-based access control
- Rate limiting and scope validation
- Multi-signature protection
- Token expiration and revocation

## Integration Points

- Layer-2 compatible (Arbitrum, Optimism, Polygon)
- Cross-chain bridge support
- Liquidity aggregation ready
- DAO governance framework
- Educational reward system
