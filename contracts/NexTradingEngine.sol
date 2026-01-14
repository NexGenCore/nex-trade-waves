// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexTradingEngine
 * @dev Core trading contract for decentralized token swaps with liquidity aggregation
 */
contract NexTradingEngine is ReentrancyGuard, Ownable {
    
    struct Trade {
        address trader;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOut;
        uint256 timestamp;
        bool executed;
    }
    
    struct LiquidityPool {
        address token0;
        address token1;
        uint256 reserve0;
        uint256 reserve1;
        uint256 fee; // in basis points (e.g., 30 = 0.3%)
    }
    
    mapping(uint256 => Trade) public trades;
    mapping(bytes32 => LiquidityPool) public pools;
    mapping(address => uint256[]) public userTrades;
    
    uint256 public tradeCounter;
    uint256 public platformFeePercentage = 25; // 0.25%
    address public feeCollector;
    
    event TradeExecuted(uint256 indexed tradeId, address indexed trader, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut);
    event LiquidityPoolCreated(bytes32 indexed poolId, address token0, address token1);
    event LiquidityAdded(bytes32 indexed poolId, uint256 amount0, uint256 amount1);
    
    constructor(address _feeCollector) {
        feeCollector = _feeCollector;
    }
    
    function createLiquidityPool(
        address _token0,
        address _token1,
        uint256 _reserve0,
        uint256 _reserve1,
        uint256 _fee
    ) external onlyOwner {
        require(_token0 != _token1, "Identical tokens");
        require(_fee <= 10000, "Invalid fee"); // Max 100%
        
        bytes32 poolId = keccak256(abi.encodePacked(_token0, _token1));
        
        pools[poolId] = LiquidityPool({
            token0: _token0,
            token1: _token1,
            reserve0: _reserve0,
            reserve1: _reserve1,
            fee: _fee
        });
        
        emit LiquidityPoolCreated(poolId, _token0, _token1);
    }
    
    function executeTrade(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _minAmountOut
    ) external nonReentrant returns (uint256 tradeId) {
        require(_tokenIn != _tokenOut, "Same token");
        require(_amountIn > 0, "Invalid amount");
        
        // Transfer tokens from user
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        
        // Calculate output amount using constant product formula
        bytes32 poolId = keccak256(abi.encodePacked(_tokenIn, _tokenOut));
        LiquidityPool storage pool = pools[poolId];
        
        require(pool.reserve0 > 0 && pool.reserve1 > 0, "Pool not initialized");
        
        uint256 amountInWithFee = _amountIn * (10000 - pool.fee) / 10000;
        uint256 amountOut = (amountInWithFee * pool.reserve1) / (pool.reserve0 + amountInWithFee);
        
        require(amountOut >= _minAmountOut, "Slippage exceeded");
        
        // Update pool reserves
        pool.reserve0 += _amountIn;
        pool.reserve1 -= amountOut;
        
        // Collect platform fee
        uint256 platformFee = (_amountIn * platformFeePercentage) / 10000;
        IERC20(_tokenIn).transfer(feeCollector, platformFee);
        
        // Transfer output tokens to user
        IERC20(_tokenOut).transfer(msg.sender, amountOut);
        
        // Record trade
        tradeId = tradeCounter++;
        trades[tradeId] = Trade({
            trader: msg.sender,
            tokenIn: _tokenIn,
            tokenOut: _tokenOut,
            amountIn: _amountIn,
            amountOut: amountOut,
            timestamp: block.timestamp,
            executed: true
        });
        
        userTrades[msg.sender].push(tradeId);
        
        emit TradeExecuted(tradeId, msg.sender, _tokenIn, _tokenOut, _amountIn, amountOut);
    }
    
    function getUserTrades(address _user) external view returns (uint256[] memory) {
        return userTrades[_user];
    }
    
    function setPlatformFee(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 1000, "Fee too high"); // Max 10%
        platformFeePercentage = _feePercentage;
    }
}
