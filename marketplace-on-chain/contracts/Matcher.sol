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
        uint256 NFTid;
        address addr;
        uint256 bid;
    }

    struct Bidder {
        address ERC20Contract;
        bytes32 message;
        bytes signature;
        uint256 NFTid;
        address addr;
        uint256 bid;
    }

    function validateSignature(
        address addr,
        bytes32 message,
        bytes memory signature
    ) private {
        string memory erro = string.concat(
            "Invalid signature for ",
            Strings.toHexString(addr)
        );
        require(true == addr.isValidSignatureNow(message, signature), erro);
    }

    function validateMessage(Seller memory seller, Bidder memory bidder)
        private
        pure
    {
        require(
            seller.NFTid == bidder.NFTid,
            "Seller and Bidder disagree about NFTid"
        );
        require(
            seller.bid == bidder.bid,
            "Seller and Bidder disagree about bid"
        );

        require(
            seller.message == bidder.message,
            "Seller and Bidder disagree about message"
        );
    }

    function validateAuction(Seller memory seller, Bidder memory bidder)
        private
    {
        validateMessage(seller, bidder);

        validateSignature(seller.addr, seller.message, seller.signature);
        validateSignature(bidder.addr, bidder.message, bidder.signature);
    }

    function swap(Seller memory seller, Bidder memory bidder)
        public
        onlyOwner
        returns (bool)
    {
        validateAuction(seller, bidder);

        // SWAP

        IERC20 bidderToken = IERC20(bidder.ERC20Contract);
        bidderToken.transferFrom(bidder.addr, seller.addr, bidder.bid);

        IERC721 sellerNFT = IERC721(seller.ERC721Contract);
        sellerNFT.safeTransferFrom(seller.addr, bidder.addr, seller.NFTid);

        return true;
    }
}
