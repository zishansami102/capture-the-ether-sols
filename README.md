# capture-the-ether-sols
Executable solutions for all challenges from [CaptureTheEther.com](https://capturetheether.com/)
Current Progress - 11600/11600 points completed.

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

* Update challenge address in the test file run challenge tests to pass the challenges on Ropsten Network
```
npx hardhat test --network ropsten
```