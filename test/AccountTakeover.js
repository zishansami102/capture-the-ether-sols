const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = `0x31C61631bD1580162975aCF4280215a8EB613FA9`;
const OWNER_PVT_KEY =
  "614f5e36cd55ddab0947d1723693fef5456e5bee24738ba90bd33c0c6e68e269";
const OWNER = new ethers.Wallet(OWNER_PVT_KEY, ethers.provider);

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("AccountTakeover", async function () {
  const chFactory = await ethers.getContractFactory("AccountTakeoverChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);

  tx = await contract.connect(OWNER).authenticate({ gasLimit: 6e6 });
  console.log("authenticate tx intitiated");
  await tx.wait();
  console.log("authenticate tx completed");

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
