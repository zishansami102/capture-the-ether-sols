const { expect} = require("chai");
const { ethers } = require("hardhat");

before(async () => {
    accounts = await ethers.getSigners();
    player = accounts[0];
    
  });
  
  it("Mapping", async function () {
    const chFactory = await ethers.getContractFactory("MappingChallenge");
    contract = await chFactory.attach(`0x19e94750Fa2E8C029561B1ae02dc034D5c321DB8`);

    myKey = 2**256-ethers.utils.solidityKeccak256(["uint256"],[1]);
    tx = await contract.set(myKey, 1, {gasLimit:6e6});
    console.log("set tx intitiated");
    await tx.wait();
    console.log("set tx completed");

    var isComplete = await contract.isComplete();
    expect(isComplete).to.be.true;
  });
