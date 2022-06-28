# capture-the-ether-sols
* Executable solutions for all challenges from [CaptureTheEther.com](https://capturetheether.com/)
* Nickname - zishan.sami
* Address - [`0x0bcd81842b22eB005BF0a55e72c971464A8a2606`](https://ropsten.etherscan.io/address/0x0bcd81842b22eb005bf0a55e72c971464a8a2606)
* Current Progress - 11600/11600 points completed.

### Steps to setup in local

* Install dependencies

```
yarn
```

* Setup `.env` file with your own keys

* Compile all the contracts
```
npx hardhat compile
```

* Update challenge address in the test file and run challenge test to pass the challenges on Ropsten Network
```
npx hardhat test/TokenBank.js --network ropsten
```