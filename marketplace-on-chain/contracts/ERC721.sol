// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Duck is ERC721, Ownable {
    // uint256 public immutable totalByAddress = 1;
    uint256 public immutable totalSupply = 5;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Minted(address indexed receiver, uint256 indexed nftId);

    constructor() ERC721("Duck", "QUAK") {}

    function mintTo(address receiver) external {
        uint256 currentTokenId = _tokenIds.current();

        require(currentTokenId <= totalSupply, "Total supply fully");
        // require(balanceOf(receiver) < totalByAddress, "Your are NFT fully");

        _tokenIds.increment();
        _safeMint(receiver, currentTokenId);

        emit Minted(receiver, currentTokenId);
    }
}
