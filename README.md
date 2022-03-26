# capture-the-ether-sols

### WIP
* It is work in progress repository.
* Solution write-ups[(like this one)](https://www.trufflesuite.com/ganache) will be available soon

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