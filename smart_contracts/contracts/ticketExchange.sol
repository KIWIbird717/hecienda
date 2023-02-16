// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ticketExchange is Ownable{
    IERC20 usdt;
    IERC20 token;
    uint cost;
    uint constant div = 1000;
    //todo ограничение на количество
    mapping(address => bool) public whitelisted;

    event swap(address to, uint amount);


    constructor(address _address, uint _cost, string memory name_, string memory symbol_, address _tokenAddress){
        usdt =  IERC20(_address);
        token = IERC20(_tokenAddress);
        cost = _cost;
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
        
        usdt.transferFrom(msg.sender, address(this), amount * (cost / div));
        token.transfer(msg.sender, amount);
        emit swap(msg.sender, amount);
    }

    function withdrawall() external onlyOwner{
        usdt.transfer(owner(), usdt.balanceOf(address(this)));
    }

}