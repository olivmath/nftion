import { Auction } from "../models/auction.model"
import { ethers } from "ethers"

// Mock NFT seller
const seller = {
    prvk: "0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f",
    addr: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
    initialPrice: 10
}

const duckAuction = new Auction(
    "0x3789e95fc86ca07d161c06dc95d5843f2b0a22457da570740703e10e8eb7ec626cd163aaab7d87d5f23074d0b5b13be7871582ffaf9c0c93cc4c49059c51d2161b",
    seller.initialPrice,
    seller.addr,
    "0xff"
)
const monkeyAuction = new Auction(
    "0x2fa6f06af42c1e2674d8d1e912d080d295d71cd652b5a885d15e3aba6da2585f67bd96a6571d5d48fe8127f9953dd555b7d6556d894f58dc1747e4e1ad48d9e91c",
    seller.initialPrice + 10,
    seller.addr,
    "0xaa"
)

export const allAuctions = {
    open: [duckAuction],
    closed: [monkeyAuction]
}

export const ownerMarketplace = new ethers.Wallet("prvk")
