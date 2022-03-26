    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    interface FuzzyIdentityChallenge {
        function authenticate() external;
    }

    contract IName {
        bytes32 x = bytes32("smarx");
        function name() external view returns(bytes32) {
            return x; 
        }

        function callAuthenticate(address chAddr) external {
            FuzzyIdentityChallenge(chAddr).authenticate();
        }
    }

    contract ContractFactory {
        function getBytecode() internal pure returns (bytes32) {
            bytes memory bytecode = type(IName).creationCode;
            return keccak256(bytecode);
        }

        // 2. Compute the address of the contract to be deployed
        // NOTE: _salt is a random number used to create an address
        function matchAddress(uint _salt) public view returns (bool) {
            return isBadCode(getAddress(_salt));
        }

        function getAddress(uint _salt) public view returns (address) {
            bytes32 bytecodeHash = getBytecode();
            bytes32 hash = keccak256(
                abi.encodePacked(bytes1(0xff), address(this), keccak256(abi.encodePacked(_salt)), bytecodeHash)
            );
            return address(uint160(uint(hash)));
        }

        function isBadCode(address _addr) internal pure returns (bool) {
            bytes20 addr = bytes20(_addr);
            bytes20 id = hex"000000000000000000000000000000000badc0de";
            bytes20 mask = hex"000000000000000000000000000000000fffffff";

            for (uint256 i = 0; i < 34; i++) {
                if (addr & mask == id) {
                    return true;
                }
                mask <<= 4;
                id <<= 4;
            }
            return false;
        }

        function deployMySol(uint _salt) public payable returns (address) {
            // This syntax is a newer way to invoke create2 without assembly, you just need to pass salt
            // https://docs.soliditylang.org/en/latest/control-structures.html#salted-contract-creations-create2
            address c_addr = address(new IName{salt: keccak256(abi.encodePacked(_salt))}());
            require(c_addr == getAddress(_salt));
            return c_addr;
        }
    }