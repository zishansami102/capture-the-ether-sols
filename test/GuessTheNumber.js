const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0xCaBB573324a9fBb6C2848cF55471543FAFdB53B7";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory("GuessTheNumberChallenge");
  contract = factory.attach();
});

it("GuessTheNumberChallenge", async function () {
  const tx = await contract.guess(42, {
    value: ethers.utils.parseEther("1.0"),
  });
  await tx.wait();
  expect(tx.hash).to.not.be.undefined;
});
