// SPDX-License-Identifier: MIT

pragma solidity ^0.4.21;

contract TokenSaleChallengeSolution {
    function test() public pure returns(uint256 numToken, uint256 val) {
        uint256 MAX_INT = 2**256 -1;
        numToken = ( MAX_INT / 10**18 ) + 1;
        val = numToken * 10**18;
    }
}