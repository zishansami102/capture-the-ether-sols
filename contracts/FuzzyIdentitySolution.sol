// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFuzzyIdentityChallenge {
    function authenticate() external;
}

contract FuzzyIdentitySolution {
    function name() external pure returns(bytes32) {
        return bytes32("smarx");
    }

    function callAuthenticate(address chAddr) external {
        IFuzzyIdentityChallenge(chAddr).authenticate();
    }
}

contract FuzzyIdentityFactory {
    FuzzyIdentitySolution public solContract;

    function createInstance(uint256 salt) public {
        bytes memory initCode = abi.encodePacked(
            type(FuzzyIdentitySolution).creationCode
        );

        assembly {
            let result := create2(0x0, add(0x20, initCode), mload(initCode), salt)
            sstore(solContract.slot, result)
        }
    }
}