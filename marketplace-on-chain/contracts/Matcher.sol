// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract Matcher {
    using SignatureChecker for address;

    function settle(bytes32 message, bytes memory signature)
        public
        view
        returns (bool)
    {
        if (true == msg.sender.isValidSignatureNow(message, signature)) {
            return true;
        } else {
            return false;
        }
    }
}
