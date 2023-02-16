// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ts {
    function start() public view returns(uint){
        return block.timestamp + 500; 
    }

    function end() public view returns(uint){
        return block.timestamp + 1200;
    }
    
}