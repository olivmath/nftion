import { Auction } from "./controler"

// Mock NFT seller
const seller = {
    addr: "0x3A68dD01B4B118b07b3d018fD149Dc0D41097f75",
    initialPrice: 10
}

const duckAuction = new Auction(
    seller.addr,
    "0xff",
    seller.initialPrice,
    "0x6940fc5db660efb51e7943a987f65fa75b3e470ebc7e4979fcec080b8bff33462cc872fd72aaa6014966fd99a33f9bb13f49df46fa606e27e6d8483721bda3041c"
)
const monkeyAuction = new Auction(
    seller.addr,
    "0xaa",
    seller.initialPrice + 10,
    "0x7ca8fa404f3e79535747cc5e8a6895343761c8b70b3018b1bebd5abe6d2b00bb3de55d04449d2316d4baeab0b34eaced4aa51c4d8dd0e19694688b24bf7d3e5f1b"
)

export const allAuctions = {
    open: [duckAuction],
    closed: [monkeyAuction]
}
