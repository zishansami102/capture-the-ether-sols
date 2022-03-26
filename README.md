# capture-the-ether-sols
Executable solutions for all challenges from [CaptureTheEther.com](https://capturetheether.com/)

### WIP
* It is work in progress repository.
* Solution write-ups[(like this one)](https://zsami.notion.site/Mapping-170e54ef2e9f4feabdf7df930adb2a97) will be available soon

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