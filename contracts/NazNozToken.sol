// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NazNozToken is ERC20 {
    constructor() public ERC20("NazNozToken", "NAZNOZ") {
        _mint(msg.sender, 100 ether);
    }
}
