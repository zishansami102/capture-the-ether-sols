const { expect } = require("chai");
const { ethers } = require("hardhat");

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory =  await ethers.getContractFactory("CallMeChallenge")
    contract = factory.attach(`0x91e974F9e28B0E60905dA627D0f9784E9D385643`)
  });
  
  it("ch2", async function () {
    const tx = await contract.callme();
    await tx.wait()
    expect(tx.hash).to.not.be.undefined
    });
