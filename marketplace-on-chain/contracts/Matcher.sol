// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract Matcher {
    using SignatureChecker for address;

    struct Seller {
        address ERC721Contract;
        bytes32 message;
        bytes signature;
        uint256 NFTid;
    }

    struct Bidder {
        address ERC20Contract;
        bytes32 message;
        bytes signature;
        uint256 bid;
    }

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

        // validate seller signature
        // validate bidder signature
        // keccak256(bid) == bidder.message
        // keccak256(NFTid) == seller.message

        // SWAP
        // bidder.ERC20Contract.call{gas: 50000}(
        //     abi.encodeWithSignature(
        //         transferFrom(bidder.addr, seller.addr, bidder.bid)
        //     )
        // );
        // seller.ERC721Contract.call{gas: 50000}(
        //     abi.encodeWithSignature(
        //         transferFrom(seller.addr, bidder.addr, seller.NFTid)
        //     )
        // );
    }
}
