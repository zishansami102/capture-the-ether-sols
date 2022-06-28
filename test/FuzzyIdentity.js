const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0xEDD84D80314deeA7bBd2eBe4eCA44676474e680C";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("FuzzyIdentity", async function () {
  const chFactory = await ethers.getContractFactory("FuzzyIdentityChallenge");
  chContract = await chFactory.attach(CHALLENGE_ADDRESS);

  const fuzzyFactory = await ethers.getContractFactory("FuzzyIdentityFactory");
  fuzzyFactoryContract = await fuzzyFactory.deploy({ gasLimit: 6e6 });
  console.log(fuzzyFactoryContract.address);
  await fuzzyFactoryContract.deployed();
  console.log("fuzzy factory contract deployed");

  const begin = Math.floor(Date.now() / 1000);

  const creationCode =
    require("./artifacts/contracts/FuzzyIdentitySolution.sol/FuzzyIdentitySolution.json").bytecode;
  const factoryAddress = fuzzyFactoryContract.address;

  const prefix = "0xff" + factoryAddress.slice(2);
  const suffix = web3.utils.sha3(creationCode).slice(2);

  var salt = 0;
  while (true) {
    const saltHex = salt.toString(16).padStart(64, "0");
    const concatString = prefix.concat(saltHex).concat(suffix);
    const hashed = web3.utils.sha3(concatString);
    // console.log(`salt: ${salt}, hashed: ${hashed}`);
    if (hashed.substr(26).includes("badc0de")) {
      console.log(`salt: ${salt}, hashed: ${hashed}`);
      break;
    }
    salt++;
  }
  const end = Math.floor(Date.now() / 1000);
  console.log(`begin: ${begin}`);
  console.log(`end: ${end} `);
  console.log(`pass: ${end - begin}`);

  tx = await fuzzyFactoryContract.createInstance(salt);
  await tx.wait();

  const solFactory = await ethers.getContractFactory("FuzzyIdentitySolution");
  solContract = await solFactory.attach(
    await fuzzyFactoryContract.solContract()
  );

  tx = await solContract.callAuthenticate(CHALLENGE_ADDRESS);
  await tx.wait();

  const isComplete = await chContract.isComplete();
  expect(isComplete).to.be.true;
});
