const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x5756b4Fce2844Ae697a070E8e4938ba675b6bDDa";

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory(
    "GuessTheSecretNumberChallenge"
  );
  contract = factory.attach(CHALLENGE_ADDRESS);
});

it("GuessTheSecretNumber", async function () {
  const answer = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;
  var num = -1;
  for (let i = 0; i < 256; i++) {
    if (ethers.utils.keccak256(i) == answer) num = i;
  }
  assert(num != -1, "number matched");
  const tx = await contract.guess(num, {
    value: ethers.utils.parseEther("1.0"),
  });
  await tx.wait();

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
