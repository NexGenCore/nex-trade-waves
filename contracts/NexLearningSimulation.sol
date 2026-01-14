// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexLearningSimulation
 * @dev Contract for tracking learning progress and distributing educational rewards
 */
contract NexLearningSimulation is Ownable {
    
    IERC20 public rewardToken;
    
    struct UserProgress {
        uint256 simulationScore;
        uint256 lessonsCompleted;
        uint256 totalRewardsEarned;
        uint256 lastActivityTime;
        bool isActive;
    }
    
    struct LearningModule {
        uint256 id;
        string title;
        uint256 difficulty; // 1-5
        uint256 rewardAmount;
        bool active;
    }
    
    mapping(address => UserProgress) public userProgress;
    mapping(uint256 => LearningModule) public modules;
    mapping(address => mapping(uint256 => bool)) public moduleCompletion;
    
    uint256 public moduleCounter;
    uint256 public totalUsersActive;
    
    event ModuleCreated(uint256 indexed moduleId, string title, uint256 difficulty);
    event ModuleCompleted(address indexed user, uint256 indexed moduleId, uint256 reward);
    event SimulationScoreUpdated(address indexed user, uint256 newScore);
    event UserActivated(address indexed user);
    
    constructor(address _rewardToken) {
        rewardToken = IERC20(_rewardToken);
    }
    
    function createModule(
        string memory _title,
        uint256 _difficulty,
        uint256 _rewardAmount
    ) external onlyOwner returns (uint256 moduleId) {
        require(_difficulty >= 1 && _difficulty <= 5, "Invalid difficulty");
        
        moduleId = moduleCounter++;
        modules[moduleId] = LearningModule({
            id: moduleId,
            title: _title,
            difficulty: _difficulty,
            rewardAmount: _rewardAmount,
            active: true
        });
        
        emit ModuleCreated(moduleId, _title, _difficulty);
    }
    
    function completeModule(uint256 _moduleId) external {
        require(modules[_moduleId].active, "Module not active");
        require(!moduleCompletion[msg.sender][_moduleId], "Already completed");
        
        // Activate user if first time
        if (!userProgress[msg.sender].isActive) {
            userProgress[msg.sender].isActive = true;
            totalUsersActive++;
            emit UserActivated(msg.sender);
        }
        
        UserProgress storage progress = userProgress[msg.sender];
        LearningModule storage module = modules[_moduleId];
        
        moduleCompletion[msg.sender][_moduleId] = true;
        progress.lessonsCompleted++;
        progress.lastActivityTime = block.timestamp;
        
        // Calculate reward based on difficulty
        uint256 reward = module.rewardAmount * module.difficulty;
        progress.totalRewardsEarned += reward;
        
        // Transfer reward tokens
        rewardToken.transfer(msg.sender, reward);
        
        emit ModuleCompleted(msg.sender, _moduleId, reward);
    }
    
    function updateSimulationScore(address _user, uint256 _score) external onlyOwner {
        require(_score <= 100, "Invalid score");
        
        UserProgress storage progress = userProgress[_user];
        progress.simulationScore = _score;
        progress.lastActivityTime = block.timestamp;
        
        emit SimulationScoreUpdated(_user, _score);
    }
    
    function getUserProgress(address _user) external view returns (
        uint256 simulationScore,
        uint256 lessonsCompleted,
        uint256 totalRewardsEarned,
        bool isActive
    ) {
        UserProgress storage progress = userProgress[_user];
        return (
            progress.simulationScore,
            progress.lessonsCompleted,
            progress.totalRewardsEarned,
            progress.isActive
        );
    }
}
