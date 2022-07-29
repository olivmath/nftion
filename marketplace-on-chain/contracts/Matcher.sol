// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
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
        require(
            true ==
                seller.addr.isValidSignatureNow(
                    seller.message,
                    seller.signature
                ) &&
                true ==
                bidder.addr.isValidSignatureNow(
                    bidder.message,
                    bidder.signature
                )
        );

        // SWAP

        IERC20 bidderToken = IERC20(bidder.ERC20Contract);
        bidderToken.transferFrom(bidder.addr, seller.addr, bidder.bid);

        IERC721 sellerNFT = IERC721(seller.ERC721Contract);
        sellerNFT.safeTransferFrom(seller.addr, bidder.addr, seller.NFTid);

        return true;
    }
}
