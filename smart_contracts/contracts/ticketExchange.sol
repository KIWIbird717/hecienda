// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./vesting/LinearVestingVaultFactory.sol";

contract exchange is Ownable{
    IERC20 usdt;
    IERC20 token;
    LinearVestingVaultFactory vesting;

    uint cost;
    uint constant div = 1000;

    uint startTimestamp;
    uint endTimestamp;

    uint max;
    uint min;
    //todo ограничение на количество
    mapping(address => bool) public whitelisted;

    event swap(address to, uint amount);


    constructor(address _address, uint _cost, address _tokenAddress, address _vesting, uint _startTimestamp, uint _endTimestamp, uint _max, uint _min){
        usdt =  IERC20(_address);
        token = IERC20(_tokenAddress);
        vesting = LinearVestingVaultFactory(_vesting);
        cost = _cost;

        max = _max;
        min = _min;

        startTimestamp = _startTimestamp;
        endTimestamp =_endTimestamp;
    }

    modifier onlyWhitelisted {
        require(whitelisted[msg.sender] == true, "only Whitelisted");
        _;
    }

    function batchWhitelist(address[] memory _users) external {
        require(msg.sender == owner(), "Only owner can whitelist");

        uint size = _users.length;
 
        for(uint256 i=0; i< size; i++){
            address user = _users[i];
            whitelisted[user] = true;
        }
    }

    function buyTickets(uint amount) public onlyWhitelisted{

        require(amount <= max, "too much");
        require(amount >= min, "too little");
        
        usdt.transferFrom(msg.sender, address(this), amount * (cost / div));
        token.transfer(msg.sender, amount);
        vesting.createVault(address(token), msg.sender, startTimestamp, endTimestamp, amount);
        emit swap(msg.sender, amount);
    }

    function withdrawall() external onlyOwner{
        usdt.transfer(owner(), usdt.balanceOf(address(this)));
    }
}