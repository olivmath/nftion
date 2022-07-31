// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Matcher is Ownable {
    using SignatureChecker for address;

    struct Seller {
        address ERC721Contract;
        bytes32 message;
        bytes signature;
        address addr;
        uint256 NFTid;
    }

    struct Bidder {
        address ERC20Contract;
        bytes32 message;
        bytes signature;
        address addr;
        uint256 bid;
    }

    function swap(Seller memory seller, Bidder memory bidder)
        public
        onlyOwner
        returns (bool)
    {
        /**
         * @todo
         *
         * validateMessage(seller.message, seller.NFTid);
         * validateMessage(bidder.message, bidder.bid);
         */

        validateSignature(seller.addr, seller.message, seller.signature);
        validateSignature(bidder.addr, bidder.message, bidder.signature);

        // SWAP

        IERC20 bidderToken = IERC20(bidder.ERC20Contract);
        bidderToken.transferFrom(bidder.addr, seller.addr, bidder.bid);

        IERC721 sellerNFT = IERC721(seller.ERC721Contract);
        sellerNFT.safeTransferFrom(seller.addr, bidder.addr, seller.NFTid);

        return true;
    }

    /**
     * todo
     * - validate if de hashed message sent is equals to bid | ntf id
     *
     * function validateMessage(bytes32 message, uint256 rawData) private view {
     * string memory prefix = "\x19Ethereum Signed Message:\n";
     * uint256 length = bytes(Strings.toString(rawData)).length;
     * bytes32 hashMsg = keccak256(abi.encodePacked(prefix, length, rawData));
     * console.logBytes32(hashMsg);
     * console.logBytes32(message);
     *
     * require(message == hashMsg, "Hash dont match with you data");
     *}
     */

    function validateSignature(
        address addr,
        bytes32 message,
        bytes memory signature
    ) private view {
        string memory erro = string.concat(
            "Invalid signature for ",
            Strings.toHexString(addr)
        );
        require(true == addr.isValidSignatureNow(message, signature), erro);
    }
}
