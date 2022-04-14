// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    constructor(uint256 initialSupply)ERC20("starBusks cappucino Token", "CAPP")public{
        _mint(msg.sender, initialSupply);
    }
}