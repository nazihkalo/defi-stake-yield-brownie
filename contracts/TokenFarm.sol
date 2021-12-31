// SPDX-License-Identifier: MIT
// Stake

//Unstake

// Issue

// AddAllowedToken

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenFarm is Ownable {
    address[] public allowedTokens;
    mapping(address => mapping(address => uint256))
        public tokenToStakerToAmount;
    address[] public stakers;
    mapping(address => uint256) public uniqueTokensStaked;
    mapping(address => address) tokenPriceFeedMapping;
    IERC20 public naznoztoken;

    constructor(address _naznoztokenaddress) {
        naznoztoken = IERC20(_naznoztokenaddress);
    }

    function setPriceFeedContract(address _token, address _priceFeed)
        public
        onlyOwner
    {
        tokenPriceFeedMapping[_token] = _priceFeed;
    }

    function getUserSingleTokenValue(address _staker, address _token)
        public
        view
        returns (uint256)
    {
        if (uniqueTokensStaked[_staker] <= 0) {
            return 0;
        }
        // Price of the token * Staking Balance
        (uint256 price, uint256 decimals) = getTokenValue(_token);

        return ((tokenToStakerToAmount[_token][_staker] * price) /
            10**decimals);
    }

    function getTokenValue(address _token)
        public
        view
        returns (uint256, uint256)
    {
        address priceFeedAddress = tokenPriceFeedMapping[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = priceFeed.decimals();

        return (uint256(price), uint256(decimals));
    }

    function getUserTotalValue(address _staker) public view returns (uint256) {
        uint256 totalValue;
        require(
            uniqueTokensStaked[_staker] > 0,
            "User does not have any tokens staked"
        );
        for (
            uint256 tokenIndex = 0;
            tokenIndex < allowedTokens.length;
            tokenIndex++
        ) {
            totalValue =
                totalValue +
                getUserSingleTokenValue(_staker, allowedTokens[tokenIndex]);
        }
        return totalValue;
    }

    function issueTokens() public onlyOwner {
        for (uint256 stakerInd = 0; stakerInd <= stakers.length; stakerInd++) {
            address recipient = stakers[stakerInd];
            uint256 userTotalValue = getUserTotalValue(recipient);
            // send them token reward
            naznoztoken.transfer(recipient, userTotalValue);
        }
    }

    function stakeTokens(uint256 _amount, address _token) public {
        // what tokens can they stake?
        require(tokenIsAllowed(_token), "Token is not supported");
        // how much can they
        require(_amount > 0, "amount must be more than 0");
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        // Store unique tokens staked by sender
        updateUniqueTokensStaked(msg.sender, _token);
        tokenToStakerToAmount[_token][msg.sender] =
            tokenToStakerToAmount[_token][msg.sender] +
            _amount;
        if (uniqueTokensStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }

    function unstakeTokens(address _token) public {
        uint256 balance = tokenToStakerToAmount[_token][msg.sender];
        require(balance > 0, "User has none of these tokens staked");
        IERC20(_token).transfer(msg.sender, balance);
        tokenToStakerToAmount[_token][msg.sender] = 0;
        uniqueTokensStaked[msg.sender] = uniqueTokensStaked[msg.sender] - 1;
    }

    function updateUniqueTokensStaked(address _sender, address _token)
        internal
    {
        if (tokenToStakerToAmount[_token][_sender] <= 0) {
            uniqueTokensStaked[_sender] = uniqueTokensStaked[_sender] + 1;
        }
    }

    function tokenIsAllowed(address _token) public returns (bool) {
        for (
            uint256 tokenInd = 0;
            tokenInd < allowedTokens.length;
            tokenInd++
        ) {
            if (allowedTokens[tokenInd] == _token) {
                return true;
            }
        }
        return false;
    }

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }
}
