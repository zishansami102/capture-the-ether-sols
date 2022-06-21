const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = `0x91e974F9e28B0E60905dA627D0f9784E9D385643`;

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory("CallMeChallenge");
  contract = factory.attach(CHALLENGE_ADDRESS);
});

it("CallMe", async function () {
  const tx = await contract.callme();
  await tx.wait();

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
