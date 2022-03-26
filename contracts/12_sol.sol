// SPDX-License-Identifier: MIT

pragma solidity ^0.4.21;

contract RetirementFundSolution {
    
    address chContractAddress;

    function RetirementFundSolution(address chContract) public payable {
        require(msg.value > 0 );
        require(chContract != 0x0);
        chContractAddress = chContract;
    }

    function destruct() public {
        selfdestruct(chContractAddress);
    }
}