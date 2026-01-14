// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexAPIKeyManager
 * @dev Manages API keys with scope validation and expiration policies
 */
contract NexAPIKeyManager is Ownable {
    
    struct APIKey {
        bytes32 keyHash;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
        bool revoked;
        uint256 scope; // Bitmask for permissions
        uint256 rateLimit; // Requests per minute
    }
    
    mapping(bytes32 => APIKey) public apiKeys;
    mapping(address => bytes32[]) public userKeys;
    mapping(bytes32 => uint256) public lastRequestTime;
    mapping(bytes32 => uint256) public requestCount;
    
    uint256 public constant SCOPE_READ = 1;
    uint256 public constant SCOPE_WRITE = 2;
    uint256 public constant SCOPE_TRADE = 4;
    uint256 public constant SCOPE_ADMIN = 8;
    
    event APIKeyCreated(address indexed owner, bytes32 indexed keyHash, uint256 expiresAt);
    event APIKeyRevoked(address indexed owner, bytes32 indexed keyHash);
    event APIKeyRotated(address indexed owner, bytes32 oldKeyHash, bytes32 newKeyHash);
    event RateLimitExceeded(bytes32 indexed keyHash);
    
    function createAPIKey(
        uint256 _expirationDays,
        uint256 _scope,
        uint256 _rateLimit
    ) external returns (bytes32 keyHash) {
        require(_expirationDays > 0 && _expirationDays <= 365, "Invalid expiration");
        require(_scope > 0, "Invalid scope");
        require(_rateLimit > 0, "Invalid rate limit");
        
        keyHash = keccak256(abi.encodePacked(msg.sender, block.timestamp, block.number));
        
        uint256 expiresAt = block.timestamp + (_expirationDays * 1 days);
        
        apiKeys[keyHash] = APIKey({
            keyHash: keyHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            expiresAt: expiresAt,
            revoked: false,
            scope: _scope,
            rateLimit: _rateLimit
        });
        
        userKeys[msg.sender].push(keyHash);
        
        emit APIKeyCreated(msg.sender, keyHash, expiresAt);
    }
    
    function revokeAPIKey(bytes32 _keyHash) external {
        APIKey storage key = apiKeys[_keyHash];
        require(key.owner == msg.sender || msg.sender == owner(), "Not authorized");
        require(!key.revoked, "Already revoked");
        
        key.revoked = true;
        emit APIKeyRevoked(msg.sender, _keyHash);
    }
    
    function rotateAPIKey(bytes32 _oldKeyHash) external returns (bytes32 newKeyHash) {
        APIKey storage oldKey = apiKeys[_oldKeyHash];
        require(oldKey.owner == msg.sender, "Not authorized");
        require(!oldKey.revoked, "Key already revoked");
        
        // Create new key with same permissions
        newKeyHash = keccak256(abi.encodePacked(msg.sender, block.timestamp, block.number));
        
        apiKeys[newKeyHash] = APIKey({
            keyHash: newKeyHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            expiresAt: oldKey.expiresAt,
            revoked: false,
            scope: oldKey.scope,
            rateLimit: oldKey.rateLimit
        });
        
        userKeys[msg.sender].push(newKeyHash);
        oldKey.revoked = true;
        
        emit APIKeyRotated(msg.sender, _oldKeyHash, newKeyHash);
    }
    
    function validateAPIKey(bytes32 _keyHash, uint256 _requiredScope) external returns (bool) {
        APIKey storage key = apiKeys[_keyHash];
        
        require(!key.revoked, "Key revoked");
        require(block.timestamp <= key.expiresAt, "Key expired");
        require((key.scope & _requiredScope) == _requiredScope, "Insufficient scope");
        
        // Check rate limit
        uint256 currentMinute = block.timestamp / 60;
        uint256 lastMinute = lastRequestTime[_keyHash] / 60;
        
        if (currentMinute != lastMinute) {
            requestCount[_keyHash] = 0;
        }
        
        requestCount[_keyHash]++;
        require(requestCount[_keyHash] <= key.rateLimit, "Rate limit exceeded");
        
        lastRequestTime[_keyHash] = block.timestamp;
        return true;
    }
    
    function getUserKeys(address _user) external view returns (bytes32[] memory) {
        return userKeys[_user];
    }
    
    function getKeyDetails(bytes32 _keyHash) external view returns (
        address owner,
        uint256 createdAt,
        uint256 expiresAt,
        bool revoked,
        uint256 scope,
        uint256 rateLimit
    ) {
        APIKey storage key = apiKeys[_keyHash];
        return (
            key.owner,
            key.createdAt,
            key.expiresAt,
            key.revoked,
            key.scope,
            key.rateLimit
        );
    }
}
