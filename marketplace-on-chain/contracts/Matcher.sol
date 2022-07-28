// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract Matcher {
    using SignatureChecker for address;

    function settle(bytes32 hash, bytes memory signature) public view {
        address signer = msg.sender;

        signer.isValidSignatureNow(hash, signature);
    }
}
