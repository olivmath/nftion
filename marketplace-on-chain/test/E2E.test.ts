/**
 * @BackgroundTest
 *
 * @Run Marketplace
 * @Run Ethereum Node
 * @Deploy ERC-721
 * @Deploy ERC-20
 */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Duck__factory, Duck } from "../typechain-types"
import { Lua__factory, Lua } from "../typechain-types"
import { ethers as hardhat } from "hardhat"
import { expect } from "chai"

const signMessage = async (signer: SignerWithAddress, msg: number) => {
    const signed = await signer.signMessage(msg.toString())
    return signed
}

// Seller give approve to marketplace operate ERC-721

// Seller open auction

// Bidder1 give approve to marketplace operate ERC-20

// Bidder1 send bid

// Bidder2 give approve to marketplace operate ERC-20

// Bidder2 send bid

// Bidder3 give approve to marketplace operate ERC-20

// Bidder3 send bid

// Seller close auction

// Seller ERC-20 balance 10
// Bidder3 NFT balance 1
// Bidder2 ERC-20 allowance 0
// Bidder1 ERC-20 allowance 0
