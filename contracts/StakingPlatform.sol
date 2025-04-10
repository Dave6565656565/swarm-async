// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingPlatform is Ownable, ReentrancyGuard {
    struct Staker {
        uint256 amount;
        uint256 startTime;
        bool withdrawn;
    }

    mapping(address => Staker) public stakers;

    uint256 public constant YEARLY_ROI = 15; // 15% annual return
    uint256 public constant EARLY_WITHDRAWAL_PENALTY = 3; // 3% penalty for early withdrawal
    uint256 public constant MIN_STAKING_DURATION = 10 days;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount, uint256 penalty);

    constructor() Ownable(msg.sender) {
        // Initialize with the deployer as the owner
    }

    modifier hasStaked(address _user) {
        require(stakers[_user].amount > 0, "No stake found");
        _;
    }

    function stake() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        Staker storage staker = stakers[msg.sender];

        if (staker.amount > 0 && !staker.withdrawn) {
            staker.amount += msg.value;
        } else {
            staker.amount = msg.value;
            staker.withdrawn = false;
        }

        staker.startTime = block.timestamp;

        emit Staked(msg.sender, msg.value);
    }

    function calculateReward(address _user) public view returns (uint256) {
        Staker storage staker = stakers[_user];
        uint256 duration = block.timestamp - staker.startTime;
        return (staker.amount * YEARLY_ROI / 100) * duration / 365 days;
    }

    function withdraw() external nonReentrant hasStaked(msg.sender) {
        Staker storage staker = stakers[msg.sender];
        require(!staker.withdrawn, "Already withdrawn");

        uint256 duration = block.timestamp - staker.startTime;

        // Enforce 10-day minimum lock period unless owner
        require(
            msg.sender == owner() || duration >= MIN_STAKING_DURATION,
            "Minimum staking period is 10 days"
        );

        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = staker.amount + reward;
        uint256 penalty = 0;

        // Apply early withdrawal penalty if under 1 year and not the owner
        if (msg.sender != owner() && duration < 365 days) {
            penalty = (totalAmount * EARLY_WITHDRAWAL_PENALTY) / 100;
            totalAmount -= penalty;
        }

        // Update state before transfer to prevent reentrancy
        staker.withdrawn = true;
        staker.amount = 0;
        staker.startTime = 0;

        payable(msg.sender).transfer(totalAmount);

        emit Withdrawn(msg.sender, totalAmount, penalty);
    }

    function getStakingBalance(address _user) external view returns (uint256) {
        return stakers[_user].amount;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Owner functions

    function withdrawFunds(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds");
        payable(owner()).transfer(amount);
    }

    function emergencyWithdraw(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }

    function withdrawERC20(IERC20 token, uint256 amount) external onlyOwner {
        token.transfer(owner(), amount);
    }
}
