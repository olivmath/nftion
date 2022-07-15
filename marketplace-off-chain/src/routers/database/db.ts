import { Auction } from "./controler"
import { ethers } from "ethers"

// Mock NFT seller
const seller = new ethers.Wallet("0x7205b57037a379056f95dda13e8c71ebfc3a7fdaa8e6ad29fe7a104e68d2d466")
const initialPrice = 10
const nftId = "0xff"
const signature0xff = await seller.signMessage(initialPrice.toString())
const signature0xaa = await seller.signMessage(initialPrice.toString())

const duckAuction = new Auction(seller.address, nftId, initialPrice, signature0xff)
const monkeyAuction = new Auction(seller.address, "0xaa", initialPrice, signature0xaa)

export const allAuctions = {
    open: [duckAuction],
    closed: [monkeyAuction]
}
