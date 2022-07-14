# Senior Blockchain Engineer

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)
[![Off-chain](https://github.com/olivmath/senior-blockchain-engineer-test/actions/workflows/off-chain.yml/badge.svg?branch=main)](https://github.com/olivmath/senior-blockchain-engineer-test/actions/workflows/off-chain.yml)
[![On-chain](https://github.com/olivmath/senior-blockchain-engineer-test/actions/workflows/on-chain.yml/badge.svg?branch=main)](https://github.com/olivmath/senior-blockchain-engineer-test/actions/workflows/on-chain.yml)

## 1° - Understand Problem

_Cheap NFT Marketplace_

NFT marketplaces often use techniques for reducing transaction fees.
Some of these techniques require users to use these marketplaces with an off-chain sibling system that assist the on-chain pieces. In this case you are tasked with designing and building a simple off-chain system and the on-chain smart-contract to enable cheap auctions. The goal is to enable trades between an ERC721 and a ERC20 with a single on-chain transaction.
The auctions should work as follows

- Owner of the NFT approves all NFT’s to the Marketplace
- Owner of the NFT signs to create an off-chain auction listing with a minimum price
- Bidder approves ERC20 tokens to Marketplace
- Bidder signs a bid for the auction
- If owner approves the bid, signs it back and retrieve to bidder
- Anyone with both signatures can settle the transaction, the owner takes the ERC20 whilst the bidder takes the NFT.

The off-chain system must be written in Node.js and it should not use any persisent storage (all created listings and bids should be stored in memory). It should also support an HTTP interface using express.js to fetch the live listings, bids, and signatures at any given time. The on-chain system should be developed using truffle or hardhat, with a solidity version greater or equal than 0.8

## 2° - Collect Data/References

- 💩 https://www.linkedin.com/pulse/how-create-nft-marketplace-polygon-codezeros/?trk=organization-update-content_share-article
- ✅ https://etherscan.io/address/0x354EF538265426d223A5faae68C9b0795f0541D9#code
- 💩 https://ethereum.stackexchange.com/questions/102660/creating-an-auction-smart-contract-without-storing-the-ether
- ✅ https://www.quicknode.com/guides/solidity/how-to-create-a-dutch-auction-smart-contract#what-is-dutch-auction
- 💩 https://ethereum.stackexchange.com/questions/94928/on-chain-vs-off-chain-nft-art-platforms
- 💩 https://hackernoon.com/how-to-create-on-chain-and-off-chain-nft-collection-smart-contracts
- 💩 https://betterprogramming.pub/handling-nft-presale-allow-lists-off-chain-47a3eb466e44
- 🕑 https://blog.chain.link/how-to-build-an-nft-marketplace-with-hardhat-and-solidity/
- 🕑 https://chambers.com/articles/nft-mechanism-and-legal-issues-of-nft-transactions
- 🕑 https://fauna.com/blog/bridging-on-chain-and-off-chain-data-in-nfts-with-fauna
- 🕑 https://docs.tatum.io/tutorials/how-to-create-a-peer-to-peer-nft-auction
- 🕑 https://nftschool.dev/concepts/non-fungible-tokens/#how-are-nfts-special
- 🕑 https://academy.binance.com/en/articles/how-to-make-your-own-nfts
- 🕑 https://quadrabyte.net/how-to-build-an-nft-marketplace-on-chain/
- 🕑 https://trufflesuite.com/guides/nft-marketplace/
- 🕑 https://github.com/ethereum/EIPs/issues/5102
- 🕑 https://www.youtube.com/watch?v=bBQif9IM9Fw
- 🕑 https://www.youtube.com/watch?v=2bjVWclBD_s
- 🕑 https://www.youtube.com/watch?v=kMnfCUvJnHo
- 🕑 https://www.youtube.com/watch?v=nOfFeRZg9oE
- 🕑 https://www.youtube.com/watch?v=7Q5E6RvLlUw
- 🕑 https://pt.wikipedia.org/wiki/Leilão
- 🕑 https://www.chainshot.com/courses
- 🕑 https://www.pointer.gg/tutorials
- 🕑 https://buildspace.so/projects
- 🕑 https://learn.questbook.xyz

## 3° - Design Solution

## 4° - Write Tests for Solution (TDD)

## 5° - Write Solution

## 6° - Iterate
