const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory("CaptureTheEther");
  contract = factory.attach(CHALLENGE_ADDRESS);
});

it("ChooseANickname", async function () {
  const nickname = ethers.utils.formatBytes32String("zishan.sami");
  const tx = await contract.setNickname(nickname);
  await tx.wait();

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
