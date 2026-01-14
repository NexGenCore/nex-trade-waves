// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexStakingRewards
 * @dev Staking contract for earning rewards and governance participation
 */
contract NexStakingRewards is ReentrancyGuard, Ownable {
    
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
        uint256 rewardDebt;
    }
    
    mapping(address => StakeInfo) public stakes;
    
    uint256 public totalStaked;
    uint256 public rewardRatePerSecond = 1157407407407; // ~100 tokens per day for 1M staked
    uint256 public lockPeriod = 7 days;
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    
    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }
    
    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Invalid amount");
        
        // Claim pending rewards first
        _claimRewards(msg.sender);
        
        // Transfer tokens from user
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        
        StakeInfo storage stakeInfo = stakes[msg.sender];
        stakeInfo.amount += _amount;
        stakeInfo.startTime = block.timestamp;
        stakeInfo.lastClaimTime = block.timestamp;
        
        totalStaked += _amount;
        
        emit Staked(msg.sender, _amount);
    }
    
    function unstake(uint256 _amount) external nonReentrant {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.amount >= _amount, "Insufficient stake");
        require(block.timestamp >= stakeInfo.startTime + lockPeriod, "Lock period active");
        
        // Claim pending rewards first
        _claimRewards(msg.sender);
        
        stakeInfo.amount -= _amount;
        totalStaked -= _amount;
        
        stakingToken.transfer(msg.sender, _amount);
        
        emit Unstaked(msg.sender, _amount);
    }
    
    function claimRewards() external nonReentrant {
        _claimRewards(msg.sender);
    }
    
    function _claimRewards(address _user) internal {
        StakeInfo storage stakeInfo = stakes[_user];
        
        if (stakeInfo.amount == 0) return;
        
        uint256 timeElapsed = block.timestamp - stakeInfo.lastClaimTime;
        uint256 reward = (stakeInfo.amount * rewardRatePerSecond * timeElapsed) / 1e18;
        
        if (reward > 0) {
            stakeInfo.lastClaimTime = block.timestamp;
            rewardToken.transfer(_user, reward);
            emit RewardClaimed(_user, reward);
        }
    }
    
    function getPendingRewards(address _user) external view returns (uint256) {
        StakeInfo storage stakeInfo = stakes[_user];
        
        if (stakeInfo.amount == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - stakeInfo.lastClaimTime;
        return (stakeInfo.amount * rewardRatePerSecond * timeElapsed) / 1e18;
    }
    
    function setRewardRate(uint256 _ratePerSecond) external onlyOwner {
        rewardRatePerSecond = _ratePerSecond;
    }
}
