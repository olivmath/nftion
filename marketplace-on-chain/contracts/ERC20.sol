// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Lua is ERC20 {
    constructor(uint256 initialSupply) ERC20("Lua", "LUA") {
        _mint(msg.sender, initialSupply);
    }
}
