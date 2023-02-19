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


    uint max;
    uint min;
    //todo ограничение на количество
    mapping(address => bool) public whitelisted;
    mapping (address => bool) public bought;
    mapping (address => address) vault;

    event swap(address to, uint amount);


    constructor(address _USDTaddress, uint _cost, address _tokenAddress, address _vesting, uint _max, uint _min){
        usdt =  IERC20(_USDTaddress);
        token = IERC20(_tokenAddress);
        vesting = LinearVestingVaultFactory(_vesting); 
        cost = _cost;

        max = _max;
        min = _min;

    }

    function getTokenAddress() public view returns (address) {
        return address(token);
    }

    
    function getIUsdtAddress() public view returns (address) {
        return address(usdt);
    }

        
    function getIVestingAddress() public view returns (address) {
        return address(vesting);
    }

    function getMin() public view returns (uint) {
        return min;
    }

    function getMax() public view returns (uint) {
        return max;
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


    function buyTickets(uint amount) public onlyWhitelisted returns(address){

        require(bought[msg.sender] == false, "already bought");
        require(amount <= max, "too much");
        require(amount >= min, "too little");
        bought[msg.sender] = true;


        
        usdt.transferFrom(msg.sender, address(this), (amount * cost) );
        
        
        token.transferFrom(owner(), address(this), amount);

        token.transfer(msg.sender, amount / 10);  


        token.approve(address(vesting), (amount) / 10 * 9);


        address vaultAddress = vesting.createVault(address(token), msg.sender, block.timestamp, block.timestamp + 365 days, (amount) / 10 * 9);
       
       vault[msg.sender] = vaultAddress;
        emit swap(msg.sender, amount);
        return vaultAddress;
    } 

    function getUserVault(address _address) public view returns (address) {
        return vault[_address];
    }

    function withdrawall() external onlyOwner{
        usdt.transfer(owner(), usdt.balanceOf(address(this)));
    }
}