const { expect } = require("chai");
const { ethers } = require("hardhat");

const CHALLENGE_ADDRESS = "0x74ABad339aACcE277052b634f8E1da18Ab6A78BF";

before(async () => {
  accounts = await ethers.getSigners();
  player = accounts[0];
});

it("PublicKeyChallengeg", async function () {
  const chFactory = await ethers.getContractFactory("PublicKeyChallenge");
  contract = await chFactory.attach(CHALLENGE_ADDRESS);

  tx = await ethers.provider.getTransaction(
    "0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb"
  );
  const signature = ethers.utils.joinSignature({
    r: tx.r,
    s: tx.s,
    v: tx.v,
  });
  const txData = {
    gasPrice: tx.gasPrice,
    gasLimit: tx.gasLimit,
    value: tx.value,
    nonce: tx.nonce,
    data: tx.data,
    chainId: tx.chainId,
    to: tx.to,
  };
  const rsTx = await ethers.utils.resolveProperties(txData);
  const msgHash = ethers.utils.keccak256(
    ethers.utils.serializeTransaction(rsTx)
  ); // as specified by ECDSA
  const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
  const recoveredPubKey =
    "0x" + ethers.utils.recoverPublicKey(msgBytes, signature).slice(4);
  const recoveredAddress = ethers.utils
    .recoverAddress(msgBytes, signature)
    .toString()
    .toLowerCase();

  expect(recoveredAddress).to.be.eq(
    "0x92b28647ae1f3264661f72fb2eb9625a89d88a31"
  );

  tx = await contract.authenticate(recoveredPubKey, { gasLimit: 6e6 });
  console.log("authenticate tx intitiated");
  await tx.wait();
  console.log("authenticate tx completed");

  var isComplete = await contract.isComplete();
  expect(isComplete).to.be.true;
});
